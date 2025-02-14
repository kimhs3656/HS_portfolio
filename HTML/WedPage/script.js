// HOME에 타이핑 커서용
const content = ["Web Developer","Developer","Web Designer","Youtube","Script Writer"];
let contentPIndex = 0;
let contentCIndex = 0;
let isDeleting = false;

function type(){
    const textElemet = document.querySelector('.text');
    const contentP = content[contentPIndex];

    if(isDeleting){
        textElemet.textContent = contentP.slice(0,contentCIndex-1);
        contentCIndex--;
        
        if(contentCIndex === 0){
            isDeleting = false;
            contentPIndex = (contentPIndex + 1) % content.length;
            setTimeout(type,500);
        }else{
            setTimeout(type,100);
        }
    }else{
        textElemet.textContent = contentP.slice(0,contentCIndex+1);
        contentCIndex++;

        if(contentCIndex===contentP.length){
            isDeleting = true;
            setTimeout(type, 2000);
        }else{
            setTimeout(type,100);
        }
    }
}
type();

//스크롤 시 메뉴 활성화(현재 섹션을 표시해줌)
window.addEventListener('scroll',()=>{
    let sections = document.querySelectorAll('section');
    let menuItems = document.querySelectorAll('.menu');

    let fromTop = window.scrollY + window.innerHeight / 2;

    sections.forEach(section =>{
        let sectionTop = section.offsetTop;
        let sectionHeight = section.offsetHeight;

        if(fromTop >= sectionTop && fromTop < sectionTop + sectionHeight){
            menuItems.forEach(item =>{
                item.classList.remove('active');
                if (item.getAttribute('href').substring(1)===section.getAttribute('id')){
                    item.classList.add('active');
                }
            })
        }
    })
});

//스크롤 시 바로 다음 섹션으로 이동
let sections = document.querySelectorAll('section');
let currentSectionIndex = 0;
let isScrolling = false;

window.addEventListener('wheel',(event)=>{
    if(isScrolling) return;

    isScrolling = true;

    if(event.deltaY > 0){
        
        if(currentSectionIndex < sections.length -1){
            currentSectionIndex++;
        }
    }else{

        if(currentSectionIndex > 0){
            currentSectionIndex--;
        }
    }
    sections[currentSectionIndex].scrollIntoView({behavior:'smooth'});

    setTimeout(()=>{
        isScrolling = false;
    }, 800);
});

// 키보드 위아래 움직이면 섹션 하나씩 넘어가기
let currentSection = 0;
window.addEventListener('keydown',function(event){
    event.preventDefault();
    if(event.key === 'ArrowUp'){
        moveToSection(currentSection - 1);
    }else if(event.key === 'ArrowDown'){
        moveToSection(currentSection + 1);
    }
});

function moveToSection(index){
    if(index >=0&&index < sections.length){
        currentSection = index;
        sections[currentSection].scrollIntoView({behavior:'smooth'});
    }
}