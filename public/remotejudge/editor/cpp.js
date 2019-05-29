window.editor = monaco.editor.create(document.getElementById('container'), {
    value:
`#include<iostream>
using namespace std;

int main(){

    return 0;
}`,
    language: 'cpp'
});