// 정답 설정 (실제 정답으로 수정해주세요!)
const correctAnswers = {
    q1: "2",   // 김나현의 생일
    q2: "3",   // 좋아하는 음식
    q3: "3",   // 서운함 느꼈을 가능성
    q4: "3",   // 민감하게 반응
    q5: "1",   // 정서적 만족도
    q6: "4",   // 간접적 애정 표현
    q7: "2",   // 스트레스 해소 방법
    q8: "4",   // 삐졌을 때 1차 반응
    q9: "2",   // 기억에 오래 남을 행동
    q10: "3",  // 연애에서 중요한 요소
    q11: "1",  // "나 안 화났어" 해석
    q12: "4",  // 연애에서 불안을 느끼는 경우
    q13: "3",  // 가장 기분 좋아질 가능성
    q14: "3",  // 오래 함께하고 싶은 조건
    q15: "4",  // 힘들어 보일 때 적절한 행동
    q16: "3",  // 자주 장난치는 이유
    q17: "1",  // 서운함 느꼈을 때 해결 방식
    q18: "3",  // 발 사이즈
    q19: "1",  // 화났을 때 행동
    q20: "4"   // 200일 관계 유지 이유
};

// 채점 완료 상태
let isGraded = false;

// 등급 메시지
function getGradeMessage(score) {
    const percentage = (score / 20) * 100;
    if (percentage === 100) {
        return "1등급 (만점)\n당신은 200일 동안 성실하고 꾸준하게 김나현을 관찰하고 이해해온 사람입니다. 단순한 기억력이 아니라, 일상 속 디테일까지 자연스럽게 체화한 수준입니다. 김나현 전문가로 인정합니다.";
    } else if (percentage >= 90) {
        return "1등급\n당신은 김나현의 취향과 성향을 상당히 정확하게 파악하고 있습니다. 작은 습관과 디테일까지 놓치지 않는 높은 이해도를 보입니다.";
    } else if (percentage >= 80) {
        return "2등급\n당신은 김나현에 대해 충분히 알고 있으며, 전반적인 성향과 취향을 잘 이해하고 있습니다. 다만 몇몇 세부 요소에서 아쉬움이 보입니다."; 
    } else if (percentage >= 70) {
        return "3등급\n기본적인 특징은 파악하고 있으나, 디테일한 부분에서 이해도가 다소 부족합니다. 추가 관찰이 권장됩니다.";
    } else if (percentage >= 60) {
        return "4등급\n김나현에 대한 인지는 있으나, 깊은 이해 단계까지는 도달하지 못했습니다. 관심도 재점검이 필요합니다.";
    } else if (percentage >= 50) {
        return "5등급\n표면적인 정보 위주로만 기억하고 있는 것으로 분석됩니다. 일상적 교류의 질적 향상이 요구됩니다.";
    } else {
        return "등급 외\n김나현에 대한 이해도가 현저히 낮습니다. 200일 재교육 프로그램 참여가 필요합니다.";
    }
}

// 문제별 정답/오답 표시
function showAnswerResults() {
    for (let i = 1; i <= 20; i++) {
        const questionName = `q${i}`;
        const questionBlock = document.querySelectorAll('.question-block')[i - 1];
        const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
        const correctAnswer = correctAnswers[questionName];
        
        // 모든 옵션에서 기존 상태 제거
        const allOptions = questionBlock.querySelectorAll('.option');
        allOptions.forEach(opt => {
            opt.classList.remove('correct', 'wrong', 'correct-answer');
        });
        
        // 정답 옵션 찾기
        const correctOption = questionBlock.querySelector(`input[name="${questionName}"][value="${correctAnswer}"]`);
        if (correctOption) {
            correctOption.closest('.option').classList.add('correct-answer');
        }
        
        if (selectedOption) {
            const parentOption = selectedOption.closest('.option');
            if (selectedOption.value === correctAnswer) {
                // 정답
                questionBlock.classList.add('answered-correct');
                questionBlock.classList.remove('answered-wrong');
                parentOption.classList.add('correct');
            } else {
                // 오답
                questionBlock.classList.add('answered-wrong');
                questionBlock.classList.remove('answered-correct');
                parentOption.classList.add('wrong');
            }
        } else {
            // 미응답
            questionBlock.classList.add('answered-wrong');
            questionBlock.classList.remove('answered-correct');
        }
        
        // 라디오 버튼 비활성화
        allOptions.forEach(opt => {
            const radio = opt.querySelector('input[type="radio"]');
            radio.disabled = true;
        });
    }
}

// 시험 리셋
function resetExam() {
    isGraded = false;
    
    // 모든 문제 블록에서 정답/오답 클래스 제거
    document.querySelectorAll('.question-block').forEach(block => {
        block.classList.remove('answered-correct', 'answered-wrong');
    });
    
    // 모든 옵션에서 상태 제거 및 라디오 버튼 활성화
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('correct', 'wrong', 'correct-answer');
        const radio = opt.querySelector('input[type="radio"]');
        radio.disabled = false;
        radio.checked = false;
    });
    
    // 버튼 텍스트 변경
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = '답안 제출하기';
    
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 폼 제출 처리
document.getElementById('examForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 이미 채점된 상태면 리셋
    if (isGraded) {
        resetExam();
        return;
    }
    
    let score = 0;
    let unanswered = [];
    
    // 각 문제 채점
    for (let i = 1; i <= 20; i++) {
        const questionName = `q${i}`;
        const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
        
        if (selectedOption) {
            if (selectedOption.value === correctAnswers[questionName]) {
                score++;
            }
        } else {
            unanswered.push(i);
        }
    }
    
    // 미응답 문제 확인
    if (unanswered.length > 0) {
        const confirmSubmit = confirm(`아직 ${unanswered.length}개의 문제를 풀지 않았습니다.\n(${unanswered.join(', ')}번)\n\n그래도 제출하시겠습니까?`);
        if (!confirmSubmit) {
            return;
        }
    }
    
    // 결과 표시
    const studentName = document.getElementById('studentName').value || '익명';
    const resultContent = document.getElementById('resultContent');
    
    resultContent.innerHTML = `
        <p><strong>${studentName}</strong>님의 성적</p>
        <span class="score">${score} / 20</span>
        <p>정답률: ${((score / 20) * 100).toFixed(1)}%</p>
        <div class="message">${getGradeMessage(score)}</div>
    `;
    
    // 모달 표시
    document.getElementById('resultModal').classList.add('show');
    
    // 채점 상태 저장
    isGraded = true;
});

// 모달 닫기
function closeModal() {
    document.getElementById('resultModal').classList.remove('show');
    
    // 채점 완료 상태면 정답/오답 표시 및 버튼 변경
    if (isGraded) {
        showAnswerResults();
        
        // 버튼 텍스트 변경
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.textContent = '다시 풀기';
        
        // 첫 번째 문제로 스크롤
        document.querySelector('.question-block').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 모달 외부 클릭시 닫기
document.getElementById('resultModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// 페이지 로드 시 스크롤 애니메이션
document.addEventListener('DOMContentLoaded', function() {
    // 동그라미 번호 스타일 적용
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        const text = option.textContent;
        const match = text.match(/([①②③④])\s*(.*)/);
        if (match) {
            const number = match[1];
            const content = match[2];
            const input = option.querySelector('input');
            option.innerHTML = '';
            option.appendChild(input);
            
            const numberSpan = document.createElement('span');
            numberSpan.className = 'number';
            numberSpan.textContent = number;
            option.appendChild(numberSpan);
            
            const textSpan = document.createElement('span');
            textSpan.className = 'text';
            textSpan.textContent = content;
            option.appendChild(textSpan);
        }
    });

    const questions = document.querySelectorAll('.question-block');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });
    
    questions.forEach((question, index) => {
        question.style.opacity = '0';
        question.style.transform = 'translateX(-20px)';
        question.style.transition = `all 0.5s ease ${index * 0.05}s`;
        observer.observe(question);
    });
});
