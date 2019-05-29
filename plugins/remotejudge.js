var axios = require('axios');
var log = require('log4js').getLogger('RemoteJudge');
log.level = 'all';
var router = require('express').Router();
var auth = require('../config').luogu;
last = {}
token = {}
const API = "https://www.luogu.org/api";

async function login(username, password) {
    var res = await axios.post(API + "/OAuth2/accessToken", {
        grant_type: 'password',
        client_id: auth.client_id,
        client_secret: auth.client_secret,
        username: username || auth.username,
        password: password || auth.password
    });
    token = JSON.parse(res.data.data.toString());
    log.info(token);
}
async function getProblem(pid) {
    log.info('Getting problem:' + pid);
    var data = await axios.get(API + "/problem/detail/" + pid);
    return data.data.data;
}
async function refreshToken() {
    var res = await axios.post(API + '/OAuth2/authorize', { 'refresh_token': token.refresh_token })
    log.info('刷新Token成功')
    token = JSON.parse(JSON.stringify(res.data.data));
}
/*
  export enum ProblemState {
    'Waiting' = 0,
    'Judging' = 1,
    'Compile Error' = 2,
    'OLE' = 3,
    'MLE' = 4,
    'TLE' = 5,
    'WA' = 6,
    'RE' = 7,
    'Accepted' = 12,
    'Unaccepted' = 14,
    'Hack Success' = 21,
    'Hack Failure' = 22,
    'Hack Skipped' = 23
  }
  */
async function submitSolution(id, text, language = 0, enableO2 = false, username, password) {
    login(username, password);
    var t = token.access_token;
    var Authorization = 'Bearer ' + t;
    log.info('Auth:' + Authorization);
    var rid = 0;
    try {
        var res = await axios.post("POST", API + "/problem/submit/" + id, {
            'code': text,
            'lang': language,
            'enableO2': enableO2,
            'verify': ''
        }, { headers: { 'Authorization': Authorization } })
        last = res;
        rid = JSON.parse(res.data.data.toString()).rid;
        log.info('Submission:' + rid);
    } catch (e) {
        log.error(e);
    }
    return rid;
}
router.post('/submit', async function (req, res) {
    log.info('Submit:' + req.body);
    res.redirect("https://www.luogu.org/recordnew/show/" + await submitSolution(req.body.pid, req.body.code, req.body.lang, false, req.body.username, req.body.password))
    //res.json({ rid: submitSolution(req.body.pid, req.body.code, req.body.lang, false, req.body.username, req.body.password) });
})
router.all('/getProblem', async function (req, res) {
    res.json(await getProblem(req.body.pid));
})
router.get('/remotejudge/getRemoteResult', async function (req, res) {
    if (!req.body.rid) res.json({ code: 400, data: 'ERROR Record ID' });
    else {
        var data = await axios.get('https://www.luogu.org/recordnew/show/' + req.body.rid);
        //document.getElementsByClassName('lg-record-tile case-tile')
        res.json({ data: data });
    }
})
setInterval(refreshToken, 600000);
module.exports = router;