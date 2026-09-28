// ========================================
// QUẢN LÝ SINH VIÊN & XẾP LOẠI HỌC TẬP
// ========================================


// ========================================
// 1. DANH SÁCH CÁC MÔN HỌC
// ========================================

const subjects = [
    "Giải tích 1",
    "Đại số tuyến tính",
    "Xác suất thống kê",
    "Tin học đại cương",
    "Xây dựng ứng dụng Web"
];


// ========================================
// 2. HÀM TÍNH ĐIỂM TRUNG BÌNH
// ========================================

function calculateAverage(scores) {

    // Tính tổng điểm của 5 môn
    const total = scores.reduce(function(sum, score) {
        return sum + score;
    }, 0);

    // Tính điểm trung bình
    const average = total / scores.length;

    return average;
}


// ========================================
// 3. HÀM XẾP LOẠI HỌC TẬP
// ========================================

function classify(avg) {

    if (avg >= 8.0) {
        return "Giỏi";
    }

    if (avg >= 6.5) {
        return "Khá";
    }

    if (avg >= 5.0) {
        return "Trung bình";
    }

    return "Yếu";
}


// ========================================
// 4. LẤY CÁC PHẦN TỬ HTML
// ========================================

const studentForm = document.getElementById("studentForm");

const studentName = document.getElementById("studentName");

const errorMessage = document.getElementById("errorMessage");

const resultSection = document.getElementById("resultSection");

const resultName = document.getElementById("resultName");

const resultTableBody = document.getElementById("resultTableBody");

const averageScore = document.getElementById("averageScore");

const classification = document.getElementById("classification");


// ========================================
// 5. LẤY 5 Ô NHẬP ĐIỂM
// ========================================

const scoreInputs = [
    document.getElementById("calculus"),
    document.getElementById("linearAlgebra"),
    document.getElementById("probability"),
    document.getElementById("informatics"),
    document.getElementById("webDevelopment")
];


// ========================================
// 6. ẨN KẾT QUẢ KHI MỚI MỞ TRANG
// ========================================

resultSection.style.display = "none";


// ========================================
// 7. XỬ LÝ KHI BẤM "TÍNH KẾT QUẢ"
// ========================================

studentForm.addEventListener("submit", function(event) {

    // Không cho trang reload
    event.preventDefault();


    // Xóa thông báo lỗi cũ
    errorMessage.textContent = "";
    errorMessage.style.display = "none";


    // ====================================
    // KIỂM TRA TÊN SINH VIÊN
    // ====================================

    const name = studentName.value.trim();

    if (name === "") {

        showError("Vui lòng nhập họ và tên sinh viên.");

        return;
    }


    // ====================================
    // LẤY ĐIỂM 5 MÔN
    // ====================================

    const scores = [];


    for (let i = 0; i < scoreInputs.length; i++) {

        const inputValue = scoreInputs[i].value.trim();


        // Kiểm tra để trống
        if (inputValue === "") {

            showError(
                "Vui lòng nhập điểm cho môn: " + subjects[i]
            );

            return;
        }


        // Chuyển dữ liệu từ chuỗi sang số
        const score = Number(inputValue);


        // Kiểm tra điểm có phải số hay không
        if (Number.isNaN(score)) {

            showError(
                "Điểm môn " + subjects[i] + " phải là một số."
            );

            return;
        }


        // Kiểm tra điểm từ 0 đến 10
        if (score < 0 || score > 10) {

            showError(
                "Điểm môn " + subjects[i] +
                " phải nằm trong khoảng từ 0 đến 10."
            );

            return;
        }


        // Thêm điểm vào mảng
        scores.push(score);
    }


    // ====================================
    // TÍNH ĐIỂM TRUNG BÌNH
    // ====================================

    const avg = calculateAverage(scores);


    // ====================================
    // XẾP LOẠI
    // ====================================

    const result = classify(avg);


    // ====================================
    // HIỂN THỊ TÊN SINH VIÊN
    // ====================================

    resultName.textContent = name;


    // ====================================
    // HIỂN THỊ BẢNG ĐIỂM
    // ====================================

    resultTableBody.innerHTML = "";


    for (let i = 0; i < subjects.length; i++) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${subjects[i]}</td>
            <td>${scores[i].toFixed(2)}</td>
        `;

        resultTableBody.appendChild(row);
    }


    // ====================================
    // HIỂN THỊ ĐIỂM TRUNG BÌNH
    // ====================================

    averageScore.textContent = avg.toFixed(2);


    // ====================================
    // HIỂN THỊ XẾP LOẠI
    // ====================================

    classification.textContent = result;


    // ====================================
    // HIỂN THỊ KHU VỰC KẾT QUẢ
    // ====================================

    resultSection.style.display = "block";


    // Cuộn xuống phần kết quả
    resultSection.scrollIntoView({
        behavior: "smooth"
    });

});


// ========================================
// 8. HÀM HIỂN THỊ LỖI
// ========================================

function showError(message) {

    errorMessage.textContent = message;

    errorMessage.style.display = "block";

    // Cuộn tới thông báo lỗi
    errorMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}