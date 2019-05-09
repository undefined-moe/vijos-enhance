var section = `
<div class="section page--contest_main visible" id="ma_flag_1">
	<div class="section__header">
		<h1 class="section__title">推荐域</h1>
	</div>
    <ol class="section__list contest__list">
	    <li class="section__list__item contest__item contest-type--oi">
            <div class="media">
                <div class="media__body medium">
                    <h1 class="contest__title">
                        <a href="/d/usaco/" data-emoji-enabled="">USACO Training</a>
                    </h1>
                </div>
            </div>
        </li>
        <li class="section__list__item contest__item contest-type--oi">
            <div class="media">
                <div class="media__body medium">
                    <h1 class="contest__title">
                        <a href="/d/masez/" data-emoji-enabled="">马二出题组</a>
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
    if (document.getElementById("ma_flag_1") != null) {
        clearInterval(InsertInterval);
        console.log('DOM injected.')
        return;
    }
    document.getElementsByClassName('large-9 columns')[0].innerHTML = data + document.getElementsByClassName('large-9 columns')[0].innerHTML
}
if (window.location.href == 'https://oj.masnn.ml/')
    window.InsertInterval = setInterval(tryInsert(section), 300);
if (window.location.href == 'http://101.200.32.126/')
    window.InsertInterval = setInterval(tryInsert(section1), 300);