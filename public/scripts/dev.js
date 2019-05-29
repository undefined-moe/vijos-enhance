var section = `
<div class='row'>
<div class="section page--contest_main visible" id="ma_dev_1">
	<div class="section__header">
		<h1 class="section__title">警告：系统当前正在进行调试。在此状态下，所做出的更改可能随时被回退。</h1>
	</div>
</div>
</div>
`
function tryInsert(data) {
    if (document.getElementById("ma_dev_1") != null) {
        clearInterval(InsertInterval);
        console.log('DOM injected.')
        return;
    }
    document.getElementsByClassName('main')[0].innerHTML = data + document.getElementsByClassName('main')[0].innerHTML
}
window.InsertInterval = setInterval(tryInsert(section), 300);