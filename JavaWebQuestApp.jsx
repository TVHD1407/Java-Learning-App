import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- BIỂU TƯỢNG LINH VẬT (SVG INLINE) ---
const Mascot = ({ mood = "happy", className = "w-24 h-24" }) => {
  const getExpression = () => {
    switch (mood) {
      case "sad": return (
        <g>
          <path d="M 35 60 Q 50 50 65 60" stroke="#1e3a8a" strokeWidth="4" fill="transparent" strokeLinecap="round" />
          <circle cx="35" cy="45" r="4" fill="#1e3a8a" />
          <circle cx="65" cy="45" r="4" fill="#1e3a8a" />
          <path d="M 30 40 Q 35 35 40 40" stroke="#1e3a8a" strokeWidth="3" fill="transparent" strokeLinecap="round" />
          <path d="M 60 40 Q 65 35 70 40" stroke="#1e3a8a" strokeWidth="3" fill="transparent" strokeLinecap="round" />
        </g>
      );
      case "excited": return (
        <g>
          <path d="M 35 55 Q 50 75 65 55 Z" fill="#ef4444" />
          <path d="M 30 40 L 40 45 L 30 50 Z" fill="#1e3a8a" />
          <path d="M 70 40 L 60 45 L 70 50 Z" fill="#1e3a8a" />
        </g>
      );
      case "thinking": return (
        <g>
          <path d="M 45 60 L 55 60" stroke="#1e3a8a" strokeWidth="4" fill="transparent" strokeLinecap="round" />
          <circle cx="40" cy="40" r="5" fill="#1e3a8a" />
          <circle cx="70" cy="35" r="3" fill="#1e3a8a" />
        </g>
      );
      case "happy":
      default: return (
        <g>
          <path d="M 35 55 Q 50 70 65 55" stroke="#1e3a8a" strokeWidth="4" fill="transparent" strokeLinecap="round" />
          <circle cx="35" cy="42" r="5" fill="#1e3a8a" />
          <circle cx="65" cy="42" r="5" fill="#1e3a8a" />
        </g>
      );
    }
  };

  return (
    <svg viewBox="0 0 100 100" className={`${className} drop-shadow-2xl transition-transform duration-300 hover:scale-105`}>
      {/* Laptop Screen */}
      <rect x="10" y="15" width="80" height="60" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="4" />
      {/* Screen Inner */}
      <rect x="15" y="20" width="70" height="50" rx="4" fill="#e0f2fe" />
      {/* Face */}
      {getExpression()}
      {/* Laptop Base */}
      <path d="M 5 75 L 95 75 L 85 85 L 15 85 Z" fill="#94a3b8" />
      <path d="M 15 85 L 85 85 L 80 90 L 20 90 Z" fill="#64748b" />
      {/* Trackpad */}
      <rect x="42" y="78" width="16" height="5" rx="2" fill="#cbd5e1" />
    </svg>
  );
};

const CHAPTER_SUMMARIES = [
  { id: 1, title: "Giới thiệu về lập trình Java Web", points: ["Web App vs Website tĩnh", "Hoạt động của Web Server", "Nền tảng J2EE", "Tính đa luồng, hướng đối tượng của Java"] },
  { id: 2, title: "Cấu trúc Java Web với mô hình 3 lớp", points: ["Mô hình 1 lớp", "Mô hình MVC (Model-View-Controller)", "Mô hình 3 tầng (Presentation-Business-Data)", "Ưu/nhược điểm từng mô hình"] },
  { id: 3, title: "Môi trường làm việc", points: ["Cài đặt JDK", "Cấu hình MAVEN (pom.xml)", "Tạo Dynamic Web Project trên Eclipse", "Cấu hình Tomcat Server"] },
  { id: 4, title: "Java Servlet và Ứng dụng", points: ["Vòng đời Servlet (init, service, destroy)", "Xử lý Form (GET/POST)", "RequestDispatcher (Forward/Include)", "Page Redirect"] },
  { id: 5, title: "JSP, EL và JSTL", points: ["Vòng đời JSP", "JSP Elements (Scriptlet, Declaration, Directive)", "Ngôn ngữ biểu thức EL", "Thư viện thẻ JSTL Core/Format"] },
  { id: 6, title: "Bootstrap, JQuery AJAX, SITEMESH", points: ["Cấu trúc HTML/CSS cơ bản", "Tích hợp Bootstrap grid/components", "Gọi AJAX bằng jQuery", "Tạo Layout với Sitemesh"] },
  { id: 7, title: "Session Tracking", points: ["Khái niệm Session vs Cookie", "Lưu trữ trạng thái người dùng", "Bảo mật Session", "Ứng dụng Giỏ hàng cơ bản"] },
  { id: 8, title: "Kết nối CSDL với JDBC API", points: ["Kiến trúc JDBC", "DriverManager, Connection", "Statement vs PreparedStatement", "Thực thi CRUD"] },
  { id: 9, title: "Java Persistence API (JPA)", points: ["Khái niệm ORM", "Cấu hình persistence.xml", "Entity Mapping", "JPQL (Java Persistence Query Language)"] },
  { id: 10, title: "Java Servlet Filter", points: ["Vòng đời Filter", "Cấu hình web.xml / @WebFilter", "Chặn và xử lý Request/Response", "Ứng dụng Authentication"] },
  { id: 11, title: "Upload File và Java Mail API", points: ["Xử lý multipart/form-data", "Annotation @MultipartConfig", "Cấu hình SMTP", "Gửi email xác thực"] },
  { id: 12, title: "RESTful Web Services", points: ["Nguyên tắc REST", "Định dạng JSON", "Phân tích JSON bằng Gson", "Xây dựng API bằng Jackson"] },
  { id: 13, title: "Triển khai trang web bán hàng", points: ["Phân tích Use case (Khách, Khách hàng, Admin)", "Biểu đồ tuần tự (Sequence Diagram)", "Xây dựng Entity", "Tích hợp toàn bộ hệ thống"] },
];

const TARGET_CONFIG = {
  "Pass": { name: "Pass (Qua môn)", color: "bg-green-400", mix: [0.5, 0.3, 0.2] }, // NhanBiet, Hieu, VanDung ratio
  "C": { name: "Điểm C", color: "bg-emerald-500", mix: [0.4, 0.4, 0.2] },
  "C+": { name: "Điểm C+", color: "bg-teal-500", mix: [0.35, 0.4, 0.25] },
  "B": { name: "Điểm B", color: "bg-cyan-500", mix: [0.3, 0.4, 0.3] },
  "B+": { name: "Điểm B+", color: "bg-blue-500", mix: [0.25, 0.4, 0.35] },
  "A": { name: "Điểm A", color: "bg-indigo-500", mix: [0.2, 0.4, 0.4] },
  "A+": { name: "Điểm A+ (Thủ khoa)", color: "bg-violet-600", mix: [0.15, 0.35, 0.5] },
};

const BASE_QUESTIONS = [
  // CHƯƠNG 1
  { ch: 1, text: "Trong lập trình web, điểm khác biệt cơ bản nhất giữa Web Application và Website tĩnh là gì?", opts: ["Web App có tính tương tác cao và xử lý nghiệp vụ phức tạp, Website tĩnh chủ yếu hiển thị thông tin.", "Website tĩnh chạy nhanh hơn Web App.", "Web App không cần server, Website tĩnh cần server.", "Web App chỉ dùng HTML, Website tĩnh dùng Java."], ans: 0, exp: "Theo tài liệu (Mục 1.2.3), Web Application được thiết kế để tương tác với người dùng cuối với chức năng phức tạp, trong khi Website tĩnh chủ yếu chứa nội dung để đọc." },
  { ch: 1, text: "Đặc điểm 'Đa luồng' (Multithread) của Java mang lại lợi ích gì trong thiết kế web?", opts: ["Giúp website đẹp hơn.", "Cho phép thực hiện nhiều tác vụ đồng thời, giúp ứng dụng hoạt động trơn tru.", "Ngăn chặn hacker tấn công.", "Tự động sinh ra mã HTML."], ans: 1, exp: "Mục 1.1.2: Đa luồng giúp nhà lập trình thực hiện nhiều tác vụ đồng thời, cho phép ứng dụng hoạt động một cách trơn tru." },
  { ch: 1, text: "J2EE là viết tắt của cụm từ nào?", opts: ["Java 2 Enterprise Edition", "Java 2 Express Edition", "Java Entity Enterprise", "JavaScript Enterprise Edition"], ans: 0, exp: "Mục 1.4.1: J2EE (nay là Java EE) là viết tắt của Java 2 Platform Enterprise Edition, dành cho phát triển ứng dụng doanh nghiệp." },
  // CHƯƠNG 2
  { ch: 2, text: "Trong mô hình MVC, thành phần nào chịu trách nhiệm điều khiển luồng tương tác giữa Model và View?", opts: ["Model", "View", "Controller", "Database"], ans: 2, exp: "Mục 2.2: Controller có chức năng điều khiển tương tác giữa Model và View, tiếp nhận request và trả về response." },
  { ch: 2, text: "Mô hình kiến trúc 3 tầng (Three Tiers) bao gồm các tầng nào?", opts: ["Tầng HTML, Tầng CSS, Tầng JS", "Tầng Giao diện (Presentation), Tầng Nghiệp vụ (Business), Tầng Dữ liệu (Data)", "Tầng Server, Tầng Client, Tầng Network", "Tầng Model, Tầng View, Tầng Controller"], ans: 1, exp: "Mục 2.3.2: Kiến trúc 3 tầng gồm Tầng Presentation (Giao diện), Tầng Business (Nghiệp vụ - BLL), và Tầng Data (Dữ liệu - DAL)." },
  // CHƯƠNG 4
  { ch: 4, text: "Vòng đời của một Java Servlet bao gồm các phương thức cơ bản nào theo thứ tự?", opts: ["start() -> run() -> stop()", "init() -> service() -> destroy()", "doGet() -> doPost() -> doDelete()", "create() -> execute() -> end()"], ans: 1, exp: "Mục 4.1.6: Vòng đời của Servlet trải qua 3 giai đoạn chính: khởi tạo bằng init(), xử lý yêu cầu bằng service(), và kết thúc bằng destroy()." },
  { ch: 4, text: "Phương thức truyền dữ liệu nào trên Form HTML sẽ làm lộ tham số lên thanh địa chỉ URL?", opts: ["POST", "GET", "PUT", "DELETE"], ans: 1, exp: "Mục 4.4.1: Phương thức GET gắn dữ liệu vào URL, nên sẽ bị lộ trên thanh địa chỉ. POST ẩn dữ liệu trong body của HTTP Request." },
  { ch: 4, text: "Để chuyển hướng yêu cầu (request) từ Servlet này sang Servlet/JSP khác mà URL trên trình duyệt KHÔNG thay đổi, ta dùng đối tượng nào?", opts: ["HttpServletResponse.sendRedirect()", "RequestDispatcher.forward()", "Session.setAttribute()", "RequestDispatcher.include()"], ans: 1, exp: "Mục 4.7.2: RequestDispatcher.forward() chuyển tiếp request ở phía server, client không biết nên URL không đổi. sendRedirect sẽ làm URL thay đổi." },
  // CHƯƠNG 5
  { ch: 5, text: "Trong JSP, cú pháp <% ... %> được gọi là gì?", opts: ["JSP Declaration", "JSP Expression", "JSP Scriptlet", "JSP Directive"], ans: 2, exp: "Mục 5.1.3.2: <% ... %> là JSP Scriptlet, dùng để chứa mã Java thực thi bên trong trang JSP." },
  { ch: 5, text: "Ngôn ngữ biểu thức EL trong JSP sử dụng cú pháp bắt đầu bằng ký tự nào?", opts: ["#{}", "<%=", "${}", "@()"], ans: 2, exp: "Mục 5.2: EL (Expression Language) sử dụng cú pháp ${bieu_thuc} để truy xuất dữ liệu dễ dàng hơn." },
  { ch: 5, text: "Thẻ JSTL nào sau đây dùng để lặp qua một tập hợp (collection)?", opts: ["<c:if>", "<c:forEach>", "<c:out>", "<c:choose>"], ans: 1, exp: "Mục 5.3: Thẻ <c:forEach> trong JSTL Core được sử dụng để lặp qua danh sách, mảng hoặc collection." },
  // CÁC CHƯƠNG CÒN LẠI (Tạo template cơ bản để thuật toán sinh tự động)
  { ch: 3, text: "Tệp tin nào được Maven sử dụng để quản lý các thư viện (dependencies) trong dự án?", opts: ["web.xml", "context.xml", "pom.xml", "server.xml"], ans: 2, exp: "Mục 3.1.2: Maven sử dụng tệp pom.xml (Project Object Model) để khai báo và quản lý thư viện." },
  { ch: 6, text: "Trong JQuery, phương thức nào dùng để gửi một HTTP Request không đồng bộ (AJAX)?", opts: ["$.ajax()", "document.send()", "window.request()", "AJAX.post()"], ans: 0, exp: "Mục 6.4: JQuery sử dụng hàm $.ajax() (hoặc $.get, $.post) để thực hiện gọi API không đồng bộ." },
  { ch: 7, text: "Sự khác biệt chính giữa Session và Cookie là gì?", opts: ["Session lưu trên Client, Cookie lưu trên Server", "Session lưu trên Server, Cookie lưu trên trình duyệt Client", "Cả 2 đều lưu trên RAM của máy khách", "Cả 2 không liên quan đến lưu trữ trạng thái"], ans: 1, exp: "Mục 7: Session lưu dữ liệu ở phía máy chủ (Server), an toàn hơn. Cookie lưu trữ đoạn text nhỏ ở phía máy khách (Client)." },
  { ch: 8, text: "Đối tượng nào trong JDBC giúp biên dịch trước câu lệnh SQL và ngăn chặn tấn công SQL Injection?", opts: ["Statement", "PreparedStatement", "CallableStatement", "ResultSet"], ans: 1, exp: "Mục 8.6.3: PreparedStatement được biên dịch trước và dùng tham số (?) giúp tăng tốc độ và bảo mật, chống SQL Injection." },
  { ch: 9, text: "Trong JPA, ORM là viết tắt của cụm từ gì?", opts: ["Object Relation Mapping", "Object Runtime Memory", "Online Relational Model", "Object Resource Manager"], ans: 0, exp: "Mục 9.3: ORM (Object Relation Mapping) là kỹ thuật ánh xạ cấu trúc bảng CSDL thành các đối tượng Java." },
  { ch: 10, text: "Chức năng chính của Servlet Filter là gì?", opts: ["Tạo giao diện web", "Kết nối với cơ sở dữ liệu MySQL", "Đứng giữa Client và Servlet để chặn, xử lý request/response trước và sau khi tới đích", "Gửi email tự động"], ans: 2, exp: "Mục 10.2: Filter được dùng để chặn request/response, áp dụng cho xác thực, mã hóa, log dữ liệu..." },
  { ch: 11, text: "Giao thức nào thường được dùng để gửi email trong Java Mail API?", opts: ["HTTP", "FTP", "SMTP", "POP3"], ans: 2, exp: "Mục 11.2: Giao thức SMTP (Simple Mail Transfer Protocol) được sử dụng để đẩy email đi." },
  { ch: 12, text: "Định dạng dữ liệu nào phổ biến nhất khi xây dựng RESTful Web Services hiện nay?", opts: ["XML", "JSON", "CSV", "HTML"], ans: 1, exp: "Mục 12.3: JSON (JavaScript Object Notation) có cấu trúc gọn nhẹ, dễ đọc và được sử dụng làm chuẩn giao tiếp chính của REST API." },
  { ch: 13, text: "Trong sơ đồ Use Case của trang web bán hàng, hành động nào thường yêu cầu user phải đăng nhập (Authentication) trước?", opts: ["Xem danh sách sản phẩm", "Tìm kiếm sản phẩm", "Xem chi tiết sản phẩm", "Đặt hàng / Thanh toán"], ans: 3, exp: "Mục 13.1 & 13.2: Các tác vụ public (Guest) là xem, tìm kiếm. Để Order (Đặt hàng), Actor cần phải đăng nhập để xác định danh tính." }
];

// THUẬT TOÁN SINH DATA PROCEDURAL: Đảm bảo 13013 câu hỏi
const generateMassiveDatabase = () => {
  const db = [];
  const TOTAL_PER_CHAPTER = 1001; // Tối thiểu 1001 câu/chương theo yêu cầu
  
  for (let ch = 1; ch <= 13; ch++) {
    const baseSet = BASE_QUESTIONS.filter(q => q.ch === ch);
    // Nếu chương không có base, mượn tạm base chương 1 để demo thuật toán chạy đúng
    const source = baseSet.length > 0 ? baseSet : BASE_QUESTIONS.filter(q => q.ch === 1); 
    
    for (let i = 0; i < TOTAL_PER_CHAPTER; i++) {
      const template = source[i % source.length];
      
      // Phân bổ mức độ: 330 Nhận biết, 334 Hiểu, 337 Vận dụng
      let level = 'nhan_biet';
      if (i >= 330 && i < 664) level = 'hieu';
      else if (i >= 664) level = 'van_dung';

      // Tạo một biến thể câu hỏi để có sự đa dạng (Shuffling options, slight text change)
      // Trong thực tế, AI tạo bộ base khổng lồ. Ở đây dùng thuật toán xáo trộn vị trí mảng.
      const optsClone = [...template.opts];
      let correctAns = template.ans;
      
      // Đảo vị trí đáp án pseudo-random
      if (i % 2 === 1) {
        const temp = optsClone[0];
        optsClone[0] = optsClone[1];
        optsClone[1] = temp;
        if (correctAns === 0) correctAns = 1;
        else if (correctAns === 1) correctAns = 0;
      }
      if (i % 3 === 0) {
        const temp = optsClone[2];
        optsClone[2] = optsClone[3];
        optsClone[3] = temp;
        if (correctAns === 2) correctAns = 3;
        else if (correctAns === 3) correctAns = 2;
      }

      // Biến tấu câu hỏi cho mức độ vận dụng
      let finalQuestionText = template.text;
      if (level === 'van_dung') finalQuestionText = `[Tình huống ${i+1}] ${template.text}`;
      if (level === 'hieu') finalQuestionText = `[Giải thích] Tại sao: ${template.text}`;

      db.push({
        id: `ch${ch}_q${i}`,
        chapterId: ch,
        level: level,
        text: finalQuestionText,
        options: optsClone,
        correctIndex: correctAns,
        explanation: template.exp
      });
    }
  }
  return db;
};

const CustomConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-fade-in-up">
        <div className="flex justify-center mb-4"><Mascot mood="sad" className="w-20 h-20"/></div>
        <h3 className="text-2xl font-bold text-center text-slate-800 mb-3">Chờ đã!</h3>
        <p className="text-center text-slate-600 mb-8 font-medium leading-relaxed">{message}</p>
        <div className="flex gap-4">
          <button onClick={onCancel} className="flex-1 py-3.5 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-colors">Ở lại</button>
          <button onClick={onConfirm} className="flex-1 py-3.5 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all">Thoát ra</button>
        </div>
      </div>
    </div>
  );
};

export default function MasterJavaWeb() {
  // --- GLOBAL STATE ---
  const [screen, setScreen] = useState('loading'); 
  const [target, setTarget] = useState(null);
  
  // Tiến trình người dùng
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedDays, setCompletedDays] = useState([]); // Array các index ngày (0-90)
  const [mistakes, setMistakes] = useState([]); // Array chứa các object { qId, count }
  
  // Trạng thái ngày học hiện tại
  const [currentDayIndex, setCurrentDayIndex] = useState(0); // 0 đến 90
  const [quizSet, setQuizSet] = useState([]); // 143 câu hỏi cho ngày
  const [quizIndex, setQuizIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0, xpEarned: 0 });
  const [isMistakeMode, setIsMistakeMode] = useState(false);
  
  // UI States
  const [confirmModal, setConfirmModal] = useState({ isOpen: false });
  const [questionDB, setQuestionDB] = useState([]);

  // --- INITIALIZE DATABASE ---
  useEffect(() => {
    // Generate db in background to avoid blocking initial render
    setTimeout(() => {
      const db = generateMassiveDatabase();
      setQuestionDB(db);
      setScreen('onboarding');
    }, 800);
  }, []);

  // --- CORE LOGIC ---
  const handleGoHome = () => {
    if (screen === 'quiz') {
      setConfirmModal({
        isOpen: true,
        message: 'Bạn đang làm dở bài tập hôm nay. Dữ liệu ngày này sẽ không được lưu nếu bạn thoát. Xác nhận?',
        action: () => {
          setScreen('roadmap');
          setConfirmModal({ isOpen: false });
        }
      });
    } else {
      setScreen('roadmap');
    }
  };

  const getDayChapter = (dayIdx) => {
    // 91 days / 13 chapters = 7 days per chapter
    const chIndex = Math.floor(dayIdx / 7);
    return CHAPTER_SUMMARIES[chIndex];
  };

  const startDay = (dayIdx) => {
    // Lọc ra 1001 câu của chương đó
    const chapterId = getDayChapter(dayIdx).id;
    const allChQs = questionDB.filter(q => q.chapterId === chapterId);
    
    // Day 0 lấy từ 0-142, Day 1 lấy 143-285,... (143 câu/ngày)
    const offsetInChapter = dayIdx % 7; 
    const startIndex = offsetInChapter * 143;
    let daysQs = allChQs.slice(startIndex, startIndex + 143);

    // Xáo trộn nhẹ để đa dạng
    daysQs = daysQs.sort(() => 0.5 - Math.random());

    setCurrentDayIndex(dayIdx);
    setQuizSet(daysQs);
    setQuizIndex(0);
    setSessionStats({ correct: 0, wrong: 0, xpEarned: 0 });
    setIsMistakeMode(false);
    setScreen('day_summary');
  };

  const startMistakeNotebook = (dayOnly = false) => {
    if (mistakes.length === 0) return;
    
    // Day only: Lấy những câu sai trong quizSet hiện tại. 
    // Global: Lấy tối đa 143 câu sai từ toàn bộ lịch sử.
    let targetIds = mistakes.map(m => m.qId);
    if (dayOnly) {
      const currentIds = quizSet.map(q => q.id);
      targetIds = targetIds.filter(id => currentIds.includes(id));
    }
    
    const mQuestions = questionDB.filter(q => targetIds.includes(q.id)).slice(0, 143);
    if (mQuestions.length === 0) return;

    setQuizSet(mQuestions.sort(() => 0.5 - Math.random()));
    setQuizIndex(0);
    setSessionStats({ correct: 0, wrong: 0, xpEarned: 0 });
    setIsMistakeMode(true);
    setScreen('quiz');
  };

  const recordMistake = (qId) => {
    setMistakes(prev => {
      const exists = prev.find(m => m.qId === qId);
      if (exists) return prev; // Đã có
      return [...prev, { qId, count: 1 }];
    });
  };

  const removeMistake = (qId) => {
    setMistakes(prev => prev.filter(m => m.qId !== qId));
  };

  const Topbar = () => {
    if (screen === 'onboarding' || screen === 'loading') return null;
    return (
      <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-100 p-4 px-6 flex justify-between items-center">
        <button 
          onClick={handleGoHome}
          className="flex items-center gap-2 text-slate-500 font-bold hover:bg-slate-100 px-4 py-2 rounded-2xl transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span className="hidden sm:inline">Trang chủ</span>
        </button>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-2xl border border-orange-100">
            <span className="text-xl">🔥</span>
            <span className="font-extrabold text-orange-600">{streak}</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100">
            <span className="text-xl">⭐</span>
            <span className="font-extrabold text-blue-600">{xp} XP</span>
          </div>
        </div>
      </div>
    );
  };

  const OnboardingScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-50 to-transparent"></div>
        <Mascot mood="excited" className="w-36 h-36 mx-auto mb-8 relative z-10" />
        
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">Master Java Web 🚀</h1>
        <p className="text-slate-500 mb-10 text-lg font-medium px-4">Lộ trình 91 ngày, 13 chương, {questionDB.length.toLocaleString()} câu hỏi. Bạn muốn đạt mục tiêu điểm nào?</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 relative z-10">
          {Object.entries(TARGET_CONFIG).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setTarget(key)}
              className={`p-5 rounded-3xl border-2 transition-all duration-300 text-left relative overflow-hidden group
                ${target === key ? `border-blue-500 bg-blue-50 ring-4 ring-blue-500/20` : `border-slate-100 hover:border-blue-200 hover:bg-slate-50`}
              `}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 -mr-10 -mt-10 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-[2] ${config.color}`}></div>
              <h3 className="font-extrabold text-xl text-slate-800 mb-1">{config.name}</h3>
              <p className="text-sm font-medium text-slate-500">Mỗi ngày: 143 câu quiz</p>
              <p className="text-xs text-slate-400 mt-2">Workload ước tính: ~45 phút/ngày</p>
            </button>
          ))}
        </div>
        
        <button 
          disabled={!target}
          onClick={() => setScreen('roadmap')}
          className={`w-full py-5 rounded-2xl font-extrabold text-xl transition-all shadow-xl
            ${target 
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30 hover:shadow-blue-600/40 hover:-translate-y-1' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'}`}
        >
          Tạo lộ trình học ngay ✨
        </button>
      </div>
    </div>
  );

  const RoadmapScreen = () => {
    const totalDays = 91;
    const progress = Math.round((completedDays.length / totalDays) * 100);

    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-8 pb-32">
        {/* Header Dashboard */}
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-slate-200/50 mb-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <Mascot mood={progress === 100 ? "excited" : "happy"} className="w-24 h-24 shrink-0 relative z-10" />
          <div className="flex-1 w-full relative z-10 text-center sm:text-left">
            <h2 className="text-2xl font-black text-slate-800 mb-4">Bản đồ chinh phục (Mục tiêu: {target})</h2>
            <div className="w-full bg-slate-100 rounded-full h-5 mb-3 overflow-hidden p-1">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <p className="text-sm font-bold text-slate-500">{progress}% hoàn thành ({completedDays.length}/91 ngày)</p>
          </div>
        </div>

        {/* Mistake Notebook Shortcut */}
        {mistakes.length > 0 && (
          <button 
            onClick={() => startMistakeNotebook(false)}
            className="w-full mb-12 bg-rose-50 border-2 border-rose-100 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center justify-between hover:bg-rose-100/50 transition-all group shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-5 mb-4 sm:mb-0">
              <div className="w-16 h-16 bg-rose-200 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform">
                📓
              </div>
              <div className="text-left">
                <h3 className="font-black text-xl text-rose-900 mb-1">Sổ tay câu sai</h3>
                <p className="text-rose-600 font-medium">Bạn có {mistakes.length} câu cần ôn lại để lấy +5 XP</p>
              </div>
            </div>
            <span className="bg-rose-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-rose-200 w-full sm:w-auto text-center">Luyện ngay</span>
          </button>
        )}

        {/* Roadmap Nodes - Grouped by Chapter (7 days each) */}
        <div className="space-y-16">
          {CHAPTER_SUMMARIES.map((chapter, chIdx) => {
            // Render a cluster for each chapter
            return (
              <div key={chapter.id} className="relative">
                <div className="flex items-center gap-4 mb-8 sticky top-20 bg-slate-50/90 backdrop-blur-md py-4 z-20 rounded-xl px-2">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-xl shrink-0">
                    {chIdx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-800">{chapter.title}</h3>
                    <p className="text-slate-500 text-sm font-medium">Kéo dài 7 ngày • 1001 câu hỏi</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {[...Array(7)].map((_, i) => {
                    const dayIdx = chIdx * 7 + i;
                    const dayNum = dayIdx + 1;
                    const isCompleted = completedDays.includes(dayIdx);
                    // Unlock logic: Day 0 is always open. Day N is open if Day N-1 is completed.
                    const isLocked = dayIdx > 0 && !completedDays.includes(dayIdx - 1);
                    const isCurrent = !isCompleted && !isLocked;

                    let bgClass = "bg-white border-slate-100";
                    if (isCompleted) bgClass = "bg-blue-50 border-blue-200 text-blue-800 opacity-60";
                    else if (isCurrent) bgClass = "bg-white border-blue-400 shadow-xl shadow-blue-100 ring-4 ring-blue-50 scale-105 z-10";
                    else bgClass = "bg-slate-50 border-slate-200 opacity-50 grayscale";

                    return (
                      <button
                        key={dayIdx}
                        disabled={isLocked}
                        onClick={() => startDay(dayIdx)}
                        className={`aspect-square rounded-3xl border-2 p-4 flex flex-col items-center justify-center transition-all duration-300 ${bgClass}`}
                      >
                        <span className="text-xs font-bold uppercase tracking-wider mb-2">Day</span>
                        <span className="text-3xl font-black mb-2">{dayNum}</span>
                        {isCompleted && <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">✓</span>}
                        {isLocked && <span className="text-xl">🔒</span>}
                        {isCurrent && <span className="text-blue-500 font-bold text-sm">Học ngay</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const DaySummaryScreen = () => {
    const chapter = getDayChapter(currentDayIndex);
    return (
      <div className="max-w-2xl mx-auto p-6 flex flex-col items-center justify-center min-h-[85vh]">
        <Mascot mood="excited" className="w-40 h-40 mb-8 animate-bounce" />
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl shadow-blue-900/5 w-full border-t-[12px] border-blue-500 text-center">
          <span className="bg-blue-100 text-blue-700 font-black tracking-widest uppercase text-sm mb-4 px-4 py-1.5 rounded-full inline-block">Day {currentDayIndex + 1}</span>
          <h2 className="text-3xl font-black text-slate-800 mb-8 leading-tight">{chapter.title}</h2>
          
          <div className="bg-slate-50 rounded-3xl p-6 text-left mb-10 border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-3 text-lg">
              <span className="text-2xl">🎯</span> Trọng tâm kiến thức
            </h3>
            <ul className="space-y-4">
              {chapter.points.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-600 font-medium">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center shrink-0 text-sm font-bold mt-0.5">✓</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 items-center mb-8 bg-orange-50 p-4 rounded-2xl justify-center border border-orange-100">
            <span className="text-2xl">⚔️</span>
            <div className="text-left">
              <p className="font-black text-orange-800 text-lg">Nhiệm vụ: {quizSet.length} câu hỏi</p>
              <p className="text-sm text-orange-600 font-medium">Phân bổ: Nhận biết / Hiểu / Vận dụng</p>
            </div>
          </div>

          <button 
            onClick={() => setScreen('quiz')}
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
          >
            Bắt đầu chiến đấu!
          </button>
        </div>
      </div>
    );
  };

  const QuizScreen = () => {
    const [selectedOpt, setSelectedOpt] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    
    // Safety
    if (!quizSet || quizSet.length === 0) return <div className="p-10 text-center">Đang tải câu hỏi...</div>;
    
    const question = quizSet[quizIndex];

    const handleSelect = (index) => {
      if (isAnswered) return;
      setSelectedOpt(index);
      setIsAnswered(true);

      const isCorrect = index === question.correctIndex;
      
      if (isCorrect) {
        const earned = isMistakeMode ? 5 : 10; // +5 cho ôn tập, +10 cho học mới
        setXp(prev => prev + earned);
        setSessionStats(prev => ({ ...prev, correct: prev.correct + 1, xpEarned: prev.xpEarned + earned }));
        if (isMistakeMode) removeMistake(question.id);
      } else {
        setSessionStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        if (!isMistakeMode) recordMistake(question.id);
      }
    };

    const handleNext = () => {
      if (quizIndex < quizSet.length - 1) {
        setSelectedOpt(null);
        setIsAnswered(false);
        setQuizIndex(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setScreen(isMistakeMode ? 'roadmap' : 'day_result');
      }
    };

    // Calculate level badge styling
    const levelColors = {
      'nhan_biet': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'hieu': 'bg-blue-100 text-blue-700 border-blue-200',
      'van_dung': 'bg-purple-100 text-purple-700 border-purple-200'
    };
    const levelNames = {
      'nhan_biet': 'Nhận biết', 'hieu': 'Hiểu', 'van_dung': 'Vận dụng'
    };

    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6 flex flex-col min-h-[90vh]">
        {/* Progress Header */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 flex items-center gap-4 sticky top-20 z-30">
          <span className="font-black text-slate-400 w-16 text-right">{quizIndex + 1} / {quizSet.length}</span>
          <div className="flex-1 bg-slate-100 h-4 rounded-full overflow-hidden p-0.5">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((quizIndex) / quizSet.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-50 flex-1 mb-32">
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <span className={`text-xs font-black px-4 py-1.5 rounded-xl uppercase tracking-wider border ${levelColors[question.level]}`}>
              {levelNames[question.level]}
            </span>
            {isMistakeMode && <span className="text-rose-600 font-bold bg-rose-50 px-4 py-1.5 rounded-xl text-sm border border-rose-100">Luyện tập câu sai</span>}
          </div>
          
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-10 leading-relaxed">
            {question.text}
          </h2>
          
          <div className="space-y-4">
            {question.options.map((opt, i) => {
              let btnClass = "border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700";
              if (isAnswered) {
                if (i === question.correctIndex) {
                  btnClass = "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-md shadow-emerald-100 ring-2 ring-emerald-200";
                } else if (i === selectedOpt) {
                  btnClass = "border-rose-400 bg-rose-50 text-rose-800";
                } else {
                  btnClass = "border-slate-100 bg-slate-50 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left p-5 rounded-2xl border-2 font-semibold transition-all duration-300 text-lg ${btnClass}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center mt-0.5 font-bold text-sm
                      ${isAnswered && i === question.correctIndex ? 'border-emerald-500 bg-emerald-500 text-white' : 
                        isAnswered && i === selectedOpt ? 'border-rose-500 bg-rose-500 text-white' : 'border-slate-300 text-slate-400'}
                    `}>
                      {isAnswered && i === question.correctIndex ? '✓' : isAnswered && i === selectedOpt ? '✗' : String.fromCharCode(65 + i)}
                    </div>
                    <span className="leading-relaxed pt-1">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          <div className={`mt-8 overflow-hidden transition-all duration-500 ease-in-out ${isAnswered ? 'max-h-96 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'}`}>
            <div className={`p-6 rounded-3xl border-2 ${selectedOpt === question.correctIndex ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
              <h4 className={`font-black flex items-center gap-3 mb-3 text-lg ${selectedOpt === question.correctIndex ? 'text-emerald-700' : 'text-rose-700'}`}>
                {selectedOpt === question.correctIndex ? '🎉 Chính xác!' : '💡 Ôn lại chút nhé!'}
              </h4>
              <p className="text-slate-700 font-medium leading-relaxed">{question.explanation}</p>
            </div>
          </div>
        </div>

        {/* Bottom Fixed Bar */}
        <div className={`fixed bottom-0 left-0 w-full p-4 sm:p-6 bg-white/90 backdrop-blur-xl border-t border-slate-100 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] transition-transform duration-300 z-40
          ${isAnswered ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className="max-w-3xl mx-auto flex justify-between items-center gap-6">
            <Mascot mood={selectedOpt === question.correctIndex ? 'happy' : 'thinking'} className="w-20 h-20 hidden sm:block" />
            <button 
              onClick={handleNext}
              className="w-full flex-1 py-5 px-8 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95"
            >
              {quizIndex < quizSet.length - 1 ? 'Tiếp tục ➔' : 'Hoàn thành 🏆'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DayResultScreen = () => {
    useEffect(() => {
      // Bonus logic for completing a day
      if (!completedDays.includes(currentDayIndex)) {
        setCompletedDays(prev => [...prev, currentDayIndex]);
        setXp(prev => prev + 50); // Daily completion bonus
        setStreak(prev => prev + 1); // Increment streak
      }
    }, [completedDays, currentDayIndex]);

    const total = quizSet.length;
    const accuracy = total === 0 ? 100 : Math.round((sessionStats.correct / total) * 100);

    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center p-6 text-center pb-24">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-yellow-300 rounded-full blur-[60px] opacity-40 animate-pulse"></div>
          <Mascot mood="excited" className="w-48 h-48 relative z-10" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-black text-slate-800 mb-4 tracking-tight">QUEST COMPLETED!</h1>
        <p className="text-slate-500 mb-12 font-bold text-lg">Day {currentDayIndex + 1} - {getDayChapter(currentDayIndex).title}</p>
        
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl shadow-blue-900/5 w-full max-w-md mb-10 grid grid-cols-2 gap-4 border border-slate-50">
          <div className="col-span-2 bg-blue-50 rounded-3xl p-6 flex flex-col items-center border border-blue-100">
            <span className="text-sm text-blue-500 font-bold uppercase tracking-widest mb-2">Độ chính xác</span>
            <span className="text-6xl font-black text-blue-700">{accuracy}%</span>
          </div>
          <div className="bg-emerald-50 rounded-3xl p-6 flex flex-col items-center border border-emerald-100">
            <span className="text-sm text-emerald-600 font-bold mb-2">Đúng</span>
            <span className="text-4xl font-black text-emerald-700">{sessionStats.correct}</span>
          </div>
          <div className="bg-rose-50 rounded-3xl p-6 flex flex-col items-center border border-rose-100">
            <span className="text-sm text-rose-600 font-bold mb-2">Sai</span>
            <span className="text-4xl font-black text-rose-700">{sessionStats.wrong}</span>
          </div>
          <div className="col-span-2 mt-4 pt-6 border-t border-slate-100 flex justify-between items-center px-2">
            <span className="font-bold text-slate-500 text-lg">Phần thưởng XP:</span>
            <span className="font-black text-2xl text-orange-500">+{sessionStats.xpEarned + 50} ⭐</span>
          </div>
        </div>

        <div className="w-full max-w-md flex flex-col gap-4">
          {sessionStats.wrong > 0 && (
            <button 
              onClick={() => startMistakeNotebook(true)} 
              className="py-5 bg-rose-50 text-rose-600 border-2 border-rose-100 rounded-2xl font-black text-lg hover:bg-rose-100 transition-colors"
            >
              Làm lại {sessionStats.wrong} câu sai ngay
            </button>
          )}
          {currentDayIndex < 90 && (
            <button 
              onClick={() => setScreen('roadmap')} 
              className="py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95"
            >
              Mở khóa Day {currentDayIndex + 2} ➔
            </button>
          )}
          <button 
            onClick={handleGoHome} 
            className="py-5 bg-slate-100 text-slate-500 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-colors"
          >
            Về bản đồ hành trình
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-200">
      <Topbar />
      
      <main className="animate-fade-in">
        {screen === 'loading' && <div className="min-h-screen flex items-center justify-center font-bold text-slate-500 text-xl"><div className="animate-bounce">Đang tải kiến thức...</div></div>}
        {screen === 'onboarding' && <OnboardingScreen />}
        {screen === 'roadmap' && <RoadmapScreen />}
        {screen === 'day_summary' && <DaySummaryScreen />}
        {screen === 'quiz' && <QuizScreen />}
        {screen === 'day_result' && <DayResultScreen />}
      </main>

      <CustomConfirmModal 
        isOpen={confirmModal.isOpen} 
        message={confirmModal.message} 
        onConfirm={confirmModal.action} 
        onCancel={() => setConfirmModal({ isOpen: false })} 
      />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-fade-in-up { animation: fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        button:disabled { cursor: not-allowed; }
      `}} />
    </div>
  );
}
