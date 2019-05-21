var section = `
<div class="section page--contest_main visible" id="ma_flag_1">
	<div class="section__header">
        <h1 class="section__title">推荐</h1>
        <p>现已支持Mozilla-Firefox！（在此纪念浪费在垃圾Firefox上的3.4小时</p>
	</div>
    <ol class="section__list contest__list">
	    <li class="section__list__item contest__item contest-type--oi">
            <div class="media">
                <div class="medium">
                    <h1 class="contest__title">
                        <a href="/p/category/USACO" data-emoji-enabled="">USACO Training</a>
                    </h1>
                </div>
                <div class="medium">
                    <h1 class="contest__title">
                        <a href="/p/category/ZOJ" data-emoji-enabled="">ZOJ</a>
                    </h1>
                </div>
                <div class="medium">
                    <h1 class="contest__title">
                        <a href="/remotejudge/?lang=cpp" data-emoji-enabled="">RemoteJudge</a>
                    </h1>
                </div>
            </div>
        </li>
    </ol>
</div>
`
var section1 = `
<div class="section page--contest_main visible" id="ma_flag_1">
	<div class="section__header">
		<h1 class="section__title">推荐</h1>
	</div>
    <ol class="section__list contest__list">
	    <li class="section__list__item contest__item contest-type--oi">
            <div class="media">
                <div class="media__body medium">
                    <h1 class="contest__title">
                        <a href="https://oj.masnn.ml/" data-emoji-enabled="">Masnn's Online Judge</a>
                    </h1>
                </div>
            </div>
        </li>
    </ol>
</div>
`
function tryInsert(data) {
    document.getElementsByClassName('large-9 columns')[0].innerHTML = data + document.getElementsByClassName('large-9 columns')[0].innerHTML
    console.info('DOM injected.')
}
export default function () {
    if (window.location.host == 'oj.masnn.ml') {
        if (window.location.pathname == '/')
            setTimeout(tryInsert(section), 300);
    }
    if (window.location.host == '101.200.32.126') {
        if (window.location.href == '/')
            setTimeout(tryInsert(section1), 300);
    }
}