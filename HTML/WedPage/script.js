// HOME에 타이핑 커서용
const content = ["Web Developer","Developer","API Specialist","Script Writer"];
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

// 배경 페이지 스크롤 처리 함수 (모달 외부에서만 작동)
let sections = document.querySelectorAll('section');
let currentSectionIndex = 0;
let isScrolling = false;

function handleBackgroundScroll(event) {
    if (isScrolling) return;

    // 배경 페이지의 스크롤만 처리
    if (event.target === document.body) {
        isScrolling = true;

        if (event.deltaY > 0) {
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
            }
        } else {
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
            }
        }

        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }
}

// 초기 상태에서 wheel 이벤트 리스너 추가
window.addEventListener('wheel', handleBackgroundScroll, { passive: false });

// 모달 내부의 스크롤은 정상적으로 작동하도록 설정
document.querySelector('.modal').addEventListener('wheel', (event) => {
    // 모달 내부에서 스크롤이 작동하도록 허용
    event.stopPropagation();
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

// document.querySelectorAll(".card1").forEach(button => {
//     button.addEventListener("click", () => {
//         const box = button.closest(".box");
//         box.classList.toggle("flipped");
//     });
// });

// document.querySelectorAll('.box-back').forEach(box => {
//     const images = box.querySelectorAll('.project-image');
//     const prevBtn = box.querySelector('.prev-btn');
//     const nextBtn = box.querySelector('.next-btn');
//     let currentIndex = 0;

//     function updateImages() {
//         images.forEach((img, index) => {
//             img.style.display = index === currentIndex ? 'block' : 'none';
//         });
//     }

//     prevBtn.addEventListener('click', () => {
//         currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
//         updateImages();
//     });

//     nextBtn.addEventListener('click', () => {
//         currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
//         updateImages();
//     });

//     updateImages(); // 초기화
// });

// 카드 클릭 시 뒤집기 기능
function flipCard(card) {
    card.classList.toggle('flipped');
}

// wheel 이벤트를 비활성화하는 함수
function disableScroll(event) {
    event.preventDefault();
}

// 모달을 열 때 스크롤 잠그기
// function openModal(event, projectIndex) {
//     event.stopPropagation(); // 부모 요소의 클릭 이벤트가 실행되지 않도록 방지
//     document.getElementById("projectModal").style.display = "block";
    
//     // 배경 페이지 스크롤 비활성화
//     document.body.style.overflow = "hidden";

//     // 페이지의 wheel 이벤트 리스너 비활성화 (모달이 열릴 때)
//     window.addEventListener('wheel', handleBackgroundScroll, { passive: false });
// }

// 모달을 닫을 때 스크롤 활성화
// function closeModal() {
//     document.getElementById("projectModal").style.display = "none";
    
//     // 배경 페이지 스크롤 활성화
//     document.body.style.overflow = "auto";

//     // 페이지의 wheel 이벤트 리스너 재활성화 (모달이 닫힐 때)
//     window.removeEventListener('wheel', handleBackgroundScroll);
// }

function openModal(event, projectIndex) {
    const modal = document.getElementById("projectModal");
    const modalContent = document.getElementById("modalContent");

    // 프로젝트별 HTML 파일 매핑
    const projectFiles = [
        "modal/personal_mail.html",
        "modal/personal_portfolio.html",
        "modal/team_powerusage.html",
        "modal/team_bususer.html",
        "modal/team_powerusage2.html"
    ];

    // AJAX 요청으로 해당 프로젝트의 HTML 파일 불러오기
    fetch(projectFiles[projectIndex])
        .then(response => response.text())
        .then(data => {
            modalContent.innerHTML = data; // 모달 내용 업데이트
            modal.style.display = "block"; // 모달 표시
            // 배경 페이지 스크롤 비활성화
            document.body.style.overflow = "hidden";
            // 페이지의 wheel 이벤트 리스너 비활성화 (모달이 열릴 때)
            window.addEventListener('wheel', handleBackgroundScroll, { passive: false });
            var swiper = new Swiper('.swiper', {
                // Install Plugin To Swiper
            
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
                },
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
                // Enable debugger
                debugger: true,
              });
        })
        .catch(error => console.error("Error loading project file:", error));
}

// 모달 닫기 기능
function closeModal() {
    document.getElementById("projectModal").style.display = "none";
    // 배경 페이지 스크롤 활성화
    document.body.style.overflow = "auto";
    // 페이지의 wheel 이벤트 리스너 재활성화 (모달이 닫힐 때)
    window.removeEventListener('wheel', handleBackgroundScroll);
}

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove("active");
    }
});