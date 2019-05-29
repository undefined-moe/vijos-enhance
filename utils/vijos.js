var MongoDB = require('./db');
async function inc_ouid_counter() {
    /*
    Increments the problem ID counter.
    Returns: Integer value before increment.
    */
    var db = new MongoDB()
    var dba = await db.connect(config.db);
    coll = dba.collection('oauth').updateOne({ '_id': 'pid_counter' }, { '$setOnInsert': { 'value': 100000 } });
    doc = await dba.collection('oauth').findOneAndUpdate({ '_id': 'pid_counter' }, { '$inc': { 'value': 1 } });
    return doc['value'];
}
function hash_vj4(password, salt) {
    dk = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
    return 'vj4|' + binascii.hexlify(dk).decode()
}
async function reg(uid, uname, password, mail) {
    validator.check_uname(uname)
    validator.check_password(password)
    validator.check_mail(mail)
    uname_lower = uname.toLowerCase()
    mail_lower = mail.toLowerCase()
    salt = pwhash.gen_salt()
    var db = new MongoDB();
    var now = new Date();
    var dba = await db.connect(config.db);
    await dba.collection('user').insertOne({
        '_id': uid,
        'uname': uname,
        'uname_lower': uname_lower,
        'mail': mail,
        'mail_lower': mail_lower,
        'salt': salt,
        'hash': hash_vj4(password, salt),
        'regat': now,
        'regip': '',
        'priv': 590852,
        'loginat': now,
        'loginip': '',
        'gravatar': mail
    }).catch()
}
module.exports = {
    inc_ouid_counter, reg
}