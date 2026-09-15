import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "java-web-quest-v1";

const GOALS = {
  Pass: { label: "Pass", questions: 8, appliedRatio: 0.2, minutesPerQuestion: 1.1, note: "Nắm nền tảng, ưu tiên Nhận biết + Hiểu" },
  C: { label: "C", questions: 9, appliedRatio: 0.24, minutesPerQuestion: 1.15, note: "Ôn chắc khái niệm và tình huống cơ bản" },
  "C+": { label: "C+", questions: 10, appliedRatio: 0.28, minutesPerQuestion: 1.2, note: "Tăng nhẹ câu đọc tình huống" },
  B: { label: "B", questions: 12, appliedRatio: 0.34, minutesPerQuestion: 1.25, note: "Cân bằng lý thuyết và vận dụng" },
  "B+": { label: "B+", questions: 14, appliedRatio: 0.4, minutesPerQuestion: 1.3, note: "Nhiều câu phân tích luồng web hơn" },
  A: { label: "A", questions: 16, appliedRatio: 0.46, minutesPerQuestion: 1.35, note: "Cường độ cao, ưu tiên Vận dụng" },
  "A+": { label: "A+", questions: 18, appliedRatio: 0.52, minutesPerQuestion: 1.4, note: "Cường độ rất cao, tối đa câu Vận dụng" },
};

const CHAPTERS_DATA = [
  {
    id: 1,
    title: "Nhập môn Java Web & nền tảng Web",
    sourceChapters: ["Chương 1 - Giới thiệu về lập trình Java Web"],
    sourceCoverage: "tr. 14-23",
    ready: true,
    summary: [
      "Java Web dùng Java ở phía máy chủ để xây dựng website/web application; phía trình duyệt vẫn kết hợp HTML, JavaScript và CSS.",
      "Các đặc trưng Java được nhấn mạnh: hướng đối tượng, đa luồng, mạnh mẽ, đơn giản, linh động và bảo mật.",
      "Ba hướng phát triển được giới thiệu: Servlet-JSP, JSF và Spring Framework.",
      "Web application là tập hợp các trang web lưu trên server, phân phối qua Internet; có thể tương tác và xử lý nghiệp vụ.",
      "Web application gồm phía client, kết nối Internet/mạng và web server; dữ liệu có thể gắn với hệ quản trị CSDL.",
      "Website trong bảng so sánh chủ yếu cung cấp nội dung; web application có tương tác, xử lý và thường cần xác thực.",
      "Web server tiếp nhận yêu cầu từ trình duyệt, xử lý/phân phối tài nguyên và gửi phản hồi qua HTTP hoặc giao thức khác.",
      "Trang web tĩnh trả về tài liệu HTML lưu sẵn; trang web động đi qua web application và có thể truy xuất dữ liệu.",
      "Java EE/J2EE cung cấp nền tảng, container và API để xây dựng ứng dụng phía máy chủ.",
      "Các nhóm công nghệ Java EE được nêu gồm web component, truy cập CSDL/tài nguyên, web service và security/container management.",
    ],
    questions: [
      {
        id: "c1-q01", level: "Nhận biết",
        question: "Theo tài liệu, Java Web chủ yếu dùng Java ở đâu trong một ứng dụng web?",
        options: ["Phía máy chủ", "Chỉ trong tệp CSS", "Chỉ trong trình duyệt như HTML", "Chỉ để thiết kế hình ảnh"],
        correct: 0,
        why: [
          "Đúng. Tài liệu mô tả Java Web dùng Java ở phía máy chủ để xây dựng website/web application.",
          "Sai. CSS dùng để trình bày giao diện, không phải vị trí tài liệu mô tả Java Web thực thi Java.",
          "Sai. Phía trình duyệt tài liệu nhắc HTML, JavaScript, CSS; Java Web được nhấn mạnh ở phía server.",
          "Sai. Java Web không được định nghĩa là công cụ chỉ để thiết kế hình ảnh.",
        ],
        explanation: "Java Web trong chương này được nhìn theo hướng server-side: Java xử lý phía máy chủ, còn giao diện web kết hợp các công nghệ phía client.",
        citation: "Chương 1 • Mục 1.1.1 • tr. 14",
      },
      {
        id: "c1-q02", level: "Nhận biết",
        question: "Đặc trưng nào sau đây được tài liệu liệt kê cho Java trong thiết kế web?",
        options: ["Hướng đối tượng", "Chỉ chạy đơn luồng", "Không có cơ chế bảo mật", "Chỉ dùng cho trang tĩnh"],
        correct: 0,
        why: [
          "Đúng. Tài liệu nêu Java là ngôn ngữ lập trình hướng đối tượng.",
          "Sai. Tài liệu nhấn mạnh Java hỗ trợ đa luồng.",
          "Sai. Tài liệu có mục riêng về tính bảo mật của Java.",
          "Sai. Java được dùng cho ứng dụng web, không bị giới hạn ở trang tĩnh.",
        ],
        explanation: "Các đặc trưng được chương 1 nêu gồm hướng đối tượng, đa luồng, mạnh mẽ, đơn giản, linh động và bảo mật.",
        citation: "Chương 1 • Mục 1.1.2 • tr. 14-15",
      },
      {
        id: "c1-q03", level: "Nhận biết",
        question: "Đặc trưng nào cho phép nhiều tiến trình/nhiệm vụ hoạt động song song trong Java theo mô tả của tài liệu?",
        options: ["Đa luồng", "Trang tĩnh", "DNS", "HTML"],
        correct: 0,
        why: [
          "Đúng. Tài liệu mô tả đa luồng giúp thực hiện nhiều tác vụ đồng thời.",
          "Sai. Trang tĩnh là loại trang web, không phải đặc trưng thực thi song song của Java.",
          "Sai. DNS liên quan phân giải tên miền.",
          "Sai. HTML là ngôn ngữ đánh dấu, không phải đặc trưng đa nhiệm của Java.",
        ],
        explanation: "Đa luồng là khả năng Java hỗ trợ nhiều luồng xử lý, giúp ứng dụng có thể thực hiện nhiều công việc cùng lúc.",
        citation: "Chương 1 • Mục 1.1.2 • tr. 15",
      },
      {
        id: "c1-q04", level: "Nhận biết",
        question: "Ba hướng/công nghệ phát triển Java Web được giới thiệu trực tiếp trong mục 1.1.3 là gì?",
        options: ["Servlet-JSP, JSF, Spring Framework", "PHP, Laravel, Django", "HTML, CSS, Photoshop", "MySQL, MongoDB, Redis"],
        correct: 0,
        why: [
          "Đúng. Đây là ba cách tiếp cận được tài liệu trình bày trong mục 1.1.3.",
          "Sai. Bộ công nghệ này không phải ba hướng Java Web được mục 1.1.3 liệt kê.",
          "Sai. HTML/CSS là công nghệ giao diện và Photoshop không thuộc ba hướng được nêu.",
          "Sai. Đây là các hệ/công nghệ dữ liệu, không phải ba hướng phát triển Java Web của mục này.",
        ],
        explanation: "Tài liệu trình bày Servlet-JSP, JSF và Spring Framework như các hướng phát triển ứng dụng Java Web.",
        citation: "Chương 1 • Mục 1.1.3 • tr. 15-16",
      },
      {
        id: "c1-q05", level: "Nhận biết",
        question: "Theo mục 1.2.1, web application là gì?",
        options: [
          "Tập hợp các trang web lưu trên server từ xa và được phân phối qua Internet",
          "Một tệp ảnh lưu trên máy cá nhân",
          "Một chương trình chỉ chạy khi không có mạng",
          "Một hệ điều hành dành cho máy chủ",
        ],
        correct: 0,
        why: [
          "Đúng. Đây là cách tài liệu định nghĩa web application.",
          "Sai. Một tệp ảnh không tạo thành web application.",
          "Sai. Tài liệu nhấn mạnh việc phân phối qua Internet/kết nối mạng.",
          "Sai. Web application là ứng dụng web, không phải hệ điều hành.",
        ],
        explanation: "Web application là tập hợp tài nguyên/trang web được lưu trên máy chủ và người dùng truy cập qua mạng để tương tác.",
        citation: "Chương 1 • Mục 1.2.1 • tr. 16",
      },
      {
        id: "c1-q06", level: "Nhận biết",
        question: "Sơ đồ thành phần cơ bản của một ứng dụng web trong tài liệu gồm những phần nào?",
        options: ["Web browser - Internet connection - Web server", "CPU - RAM - GPU", "CSS - IDE - Printer", "Mouse - Keyboard - Scanner"],
        correct: 0,
        why: [
          "Đúng. Sơ đồ ở mục 1.2.2 nối web browser qua Internet connection tới web server.",
          "Sai. Đây là phần cứng máy tính, không phải sơ đồ ứng dụng web trong tài liệu.",
          "Sai. Bộ ba này không phải cấu trúc được sơ đồ trình bày.",
          "Sai. Đây là thiết bị nhập/xuất, không phải thành phần ứng dụng web.",
        ],
        explanation: "Mô hình cơ bản trong hình minh họa gồm trình duyệt ở phía client, kết nối mạng và web server ở phía server.",
        citation: "Chương 1 • Mục 1.2.2 • tr. 16-17",
      },
      {
        id: "c1-q07", level: "Nhận biết",
        question: "Vai trò chính của Web Server theo mục 1.3.1 là gì?",
        options: [
          "Tiếp nhận yêu cầu web và gửi phản hồi cho client",
          "Chỉ soạn thảo mã nguồn Java",
          "Chỉ lưu ảnh ngoại tuyến",
          "Thay thế hoàn toàn trình duyệt",
        ],
        correct: 0,
        why: [
          "Đúng. Web server phục vụ ứng dụng web, nhận yêu cầu và gửi phản hồi qua HTTP hoặc giao thức khác.",
          "Sai. Soạn thảo mã nguồn là công việc của IDE/trình soạn thảo, không phải vai trò chính được nêu.",
          "Sai. Web server phục vụ nhiều loại tài nguyên và xử lý yêu cầu, không chỉ lưu ảnh.",
          "Sai. Trình duyệt là phía client và không bị web server thay thế.",
        ],
        explanation: "Web server là thành phần trung gian phục vụ tài nguyên/ứng dụng web: nhận request từ client và trả response.",
        citation: "Chương 1 • Mục 1.3.1 • tr. 18",
      },
      {
        id: "c1-q08", level: "Nhận biết",
        question: "Tên nào sau đây được liệt kê là một Web Server phổ biến trong tài liệu?",
        options: ["Apache Tomcat", "Microsoft Word", "Adobe Illustrator", "Android Studio Emulator"],
        correct: 0,
        why: [
          "Đúng. Apache Tomcat được mục 1.3.3 liệt kê và mô tả là web server hỗ trợ Servlet/JSP.",
          "Sai. Microsoft Word không được liệt kê là web server.",
          "Sai. Adobe Illustrator không phải web server trong danh sách.",
          "Sai. Trình giả lập Android không phải web server được mục 1.3.3 nêu.",
        ],
        explanation: "Mục 1.3.3 nêu Apache HTTP Server, Nginx, IIS và Apache Tomcat như các web server phổ biến.",
        citation: "Chương 1 • Mục 1.3.3 • tr. 19-20",
      },
      {
        id: "c1-q09", level: "Nhận biết",
        question: "Đặc điểm cốt lõi của trang web tĩnh theo mục 1.3.4 là gì?",
        options: [
          "Nội dung HTML lưu sẵn và không đổi cho đến khi lập trình viên cập nhật",
          "Luôn truy vấn cơ sở dữ liệu trước khi trả về",
          "Bắt buộc phải chạy qua web application",
          "Không dùng giao thức HTTP",
        ],
        correct: 0,
        why: [
          "Đúng. Tài liệu mô tả trang web tĩnh là tài liệu HTML lưu trong tệp và không thay đổi cho đến khi được chỉnh sửa.",
          "Sai. Đây là đặc trưng gắn với xử lý động, không phải trang tĩnh.",
          "Sai. Sơ đồ trang tĩnh trả HTML file từ web server trực tiếp cho browser.",
          "Sai. Tài liệu mô tả browser gửi HTTP request tới web server.",
        ],
        explanation: "Trang tĩnh trả tài liệu HTML đã có sẵn; nội dung không được tạo động từ ứng dụng hoặc cơ sở dữ liệu ở thời điểm request.",
        citation: "Chương 1 • Mục 1.3.4 • tr. 20",
      },
      {
        id: "c1-q10", level: "Nhận biết",
        question: "J2EE trước đây được gọi đầy đủ là gì theo tài liệu?",
        options: ["Java 2 Platform Enterprise Edition", "Java 2 Personal Editing Engine", "JavaScript Enterprise Edition", "Java Two Page Editor"],
        correct: 0,
        why: [
          "Đúng. Tài liệu ghi J2EE trước đây là Java 2 Platform Enterprise Edition.",
          "Sai. Cụm này không xuất hiện như tên đầy đủ của J2EE.",
          "Sai. J2EE thuộc nền tảng Java, không phải JavaScript.",
          "Sai. Đây không phải tên được tài liệu sử dụng.",
        ],
        explanation: "Mục 1.4.1 giới thiệu Java Platform Enterprise Edition (Java EE) và nhắc tên trước đây là Java 2 Platform Enterprise Edition (J2EE).",
        citation: "Chương 1 • Mục 1.4.1 • tr. 21",
      },

      {
        id: "c1-q11", level: "Hiểu",
        question: "Điểm khác biệt nào phù hợp nhất với bảng so sánh Web Application và Website trong tài liệu?",
        options: [
          "Web Application có tương tác với người dùng, Website trong bảng được mô tả là không tương tác",
          "Website luôn phức tạp hơn Web Application",
          "Web Application chỉ chứa nội dung tĩnh",
          "Website bắt buộc phải có xác thực người dùng",
        ],
        correct: 0,
        why: [
          "Đúng. Bảng nêu Web Application có tính tương tác, còn Website không tương tác với người dùng.",
          "Sai. Bảng mô tả Web Application có chức năng khá phức tạp, Website có chức năng đơn giản.",
          "Sai. Web Application có xử lý và tương tác, không bị giới hạn ở nội dung tĩnh.",
          "Sai. Bảng nêu Website không cần thiết phải xác thực, trong khi Web Application chủ yếu có yêu cầu xác thực.",
        ],
        explanation: "Bảng ở mục 1.2.3 dùng mức tương tác, khả năng sửa dữ liệu, biên dịch, độ phức tạp và xác thực để phân biệt hai khái niệm.",
        citation: "Chương 1 • Mục 1.2.3 • tr. 17-18",
      },
      {
        id: "c1-q12", level: "Hiểu",
        question: "Vì sao Web Application thường phù hợp hơn Website khi người dùng cần cập nhật dữ liệu?",
        options: [
          "Vì người dùng Web Application có thể thao tác dữ liệu, còn Website trong bảng chủ yếu cho đọc nội dung",
          "Vì Website không thể mở bằng trình duyệt",
          "Vì Web Application không cần máy chủ",
          "Vì Website luôn dùng cơ sở dữ liệu còn Web Application thì không",
        ],
        correct: 0,
        why: [
          "Đúng. Bảng so sánh nêu người dùng Web Application đọc nội dung và có thể thao tác dữ liệu; Website chủ yếu đọc nội dung.",
          "Sai. Tài liệu nói Website vẫn được xem qua trình duyệt.",
          "Sai. Web Application được lưu/phân phối từ server.",
          "Sai. Nhận định này đảo ngược và không được bảng hỗ trợ.",
        ],
        explanation: "Khả năng thao tác dữ liệu và tương tác là tiêu chí quan trọng khiến Web Application phù hợp với các quy trình nghiệp vụ hơn Website nội dung đơn giản.",
        citation: "Chương 1 • Mục 1.2.3 • tr. 17-18",
      },
      {
        id: "c1-q13", level: "Hiểu",
        question: "Trong luồng trang web tĩnh, sau khi nhận HTTP request hợp lệ, web server chủ yếu làm gì?",
        options: [
          "Gửi tệp HTML tương ứng trở lại trình duyệt",
          "Bắt buộc gọi web application và database",
          "Biên dịch lại toàn bộ hệ điều hành",
          "Chuyển request thành email",
        ],
        correct: 0,
        why: [
          "Đúng. Sơ đồ web tĩnh cho thấy web server lấy HTML file và gửi HTTP response về browser.",
          "Sai. Đây là luồng gần với trang động; trang tĩnh không bắt buộc đi qua web application/database.",
          "Sai. Không có bước này trong mô tả.",
          "Sai. Không có thao tác chuyển request thành email trong luồng trang tĩnh.",
        ],
        explanation: "Trang tĩnh được phục vụ trực tiếp từ tệp HTML đã lưu trên server, nên luồng xử lý ngắn hơn trang động.",
        citation: "Chương 1 • Mục 1.3.4 • tr. 20",
      },
      {
        id: "c1-q14", level: "Hiểu",
        question: "Điểm bổ sung quan trọng trong luồng trang web động so với trang web tĩnh là gì?",
        options: [
          "Web server chuyển yêu cầu tới web application, có thể truy xuất database rồi tạo phản hồi",
          "Không có HTTP request",
          "Trình duyệt tự truy vấn trực tiếp database trong mọi trường hợp",
          "Không cần máy chủ web",
        ],
        correct: 0,
        why: [
          "Đúng. Sơ đồ web động thêm web application và database vào chuỗi xử lý.",
          "Sai. Sơ đồ vẫn bắt đầu từ HTTP request của client.",
          "Sai. Tài liệu mô tả browser gửi request tới web server; web application mới xử lý/truy xuất dữ liệu.",
          "Sai. Web server vẫn là thành phần trong sơ đồ.",
        ],
        explanation: "Trang động tạo nội dung dựa trên xử lý của web application và dữ liệu, sau đó web server gửi response về trình duyệt.",
        citation: "Chương 1 • Mục 1.3.5 • tr. 20-21",
      },
      {
        id: "c1-q15", level: "Hiểu",
        question: "Vì sao trình duyệt cần cơ chế phân giải tên miền khi người dùng nhập một URL dạng tên miền?",
        options: [
          "Để tìm địa chỉ IP tương ứng của máy chủ trước khi gửi yêu cầu",
          "Để đổi HTML thành Java",
          "Để bỏ qua web server",
          "Để tự động tạo cơ sở dữ liệu mới",
        ],
        correct: 0,
        why: [
          "Đúng. Mục hoạt động Web Server mô tả trình duyệt tìm IP từ tên miền rồi gửi yêu cầu tới địa chỉ đó.",
          "Sai. Phân giải tên miền không phải bước chuyển HTML thành Java.",
          "Sai. Sau khi có IP, request vẫn gửi tới máy chủ/web server.",
          "Sai. DNS không tạo cơ sở dữ liệu.",
        ],
        explanation: "Tên miền là tên dễ nhớ; quá trình phân giải giúp trình duyệt xác định địa chỉ IP của nơi chứa trang web.",
        citation: "Chương 1 • Mục 1.3.2 • tr. 18-19",
      },
      {
        id: "c1-q16", level: "Hiểu",
        question: "Quan hệ đúng giữa HTTP request và HTTP response trong mô tả của chương 1 là gì?",
        options: [
          "Client gửi request và web server trả response",
          "Web server luôn gửi request trước, client trả response",
          "Chỉ database mới được phép tạo response",
          "HTTP chỉ dùng cho trang tĩnh và không dùng cho trang động",
        ],
        correct: 0,
        why: [
          "Đúng. Các sơ đồ tĩnh/động đều thể hiện browser gửi HTTP request và server gửi HTTP response.",
          "Sai. Chiều này bị đảo ngược so với sơ đồ.",
          "Sai. Database có thể cung cấp dữ liệu cho web application, nhưng response được trả về client qua web server.",
          "Sai. Cả sơ đồ trang tĩnh và động đều dùng HTTP request/response.",
        ],
        explanation: "Mô hình request-response là trục giao tiếp cơ bản giữa browser và server trong các ví dụ của chương.",
        citation: "Chương 1 • Mục 1.3.4-1.3.5 • tr. 20-21",
      },
      {
        id: "c1-q17", level: "Hiểu",
        question: "Theo phần so sánh các hướng Java Web, nhận định nào đúng về JSF so với Servlet-JSP?",
        options: [
          "JSF được mô tả là công nghệ mới hơn và cung cấp API cấp cao hơn",
          "JSF không liên quan Java Web",
          "Servlet-JSP luôn không thể tạo HTML",
          "JSF chỉ là một hệ quản trị cơ sở dữ liệu",
        ],
        correct: 0,
        why: [
          "Đúng. Tài liệu nêu JSF mới hơn, thiết kế thay thế Servlet/JSP và có API cấp cao hơn.",
          "Sai. JSF được trình bày trực tiếp như một cách phát triển ứng dụng Java Web.",
          "Sai. Servlet/JSP được mô tả dùng để tạo và xử lý HTML động.",
          "Sai. JSF là framework/công nghệ web, không phải DBMS.",
        ],
        explanation: "JSF được giới thiệu như một mức trừu tượng cao hơn, giúp lập trình viên thao tác qua API cấp cao thay vì xử lý thấp hơn như Servlet/JSP.",
        citation: "Chương 1 • Mục 1.1.3 • tr. 16",
      },
      {
        id: "c1-q18", level: "Hiểu",
        question: "Ý nghĩa chính của Spring Framework trong mục 1.1.3 là gì?",
        options: [
          "Cung cấp API/framework giúp phát triển ứng dụng web và tích hợp các thành phần như Spring/Hibernate",
          "Là một trình duyệt web",
          "Là một loại tệp HTML tĩnh",
          "Là giao thức thay thế HTTP trong chương này",
        ],
        correct: 0,
        why: [
          "Đúng. Tài liệu mô tả Spring Framework cung cấp API cấp cao và có thể kết hợp với Hibernate cùng các thành phần web.",
          "Sai. Spring Framework không được mô tả là trình duyệt.",
          "Sai. Spring là framework, không phải tệp HTML.",
          "Sai. Spring không được định nghĩa là giao thức mạng.",
        ],
        explanation: "Spring được giới thiệu như framework phát triển Java, giúp tổ chức và xây dựng ứng dụng web ở mức cao hơn.",
        citation: "Chương 1 • Mục 1.1.3 • tr. 16",
      },
      {
        id: "c1-q19", level: "Hiểu",
        question: "Vì sao J2EE/Java EE sử dụng mô hình container-component?",
        options: [
          "Để cung cấp môi trường chạy và các API/dịch vụ cho từng loại component",
          "Để loại bỏ hoàn toàn server",
          "Để mọi component đều phải chạy trong trình duyệt",
          "Để biến mọi trang web thành trang tĩnh",
        ],
        correct: 0,
        why: [
          "Đúng. Mục 1.4.2 mô tả các container tạo môi trường cho component và cung cấp API phù hợp.",
          "Sai. Java EE vẫn là nền tảng ứng dụng phía máy chủ.",
          "Sai. Các component có container khác nhau; không phải tất cả chạy trong browser.",
          "Sai. Container không nhằm biến nội dung thành tĩnh.",
        ],
        explanation: "Container giúp chuẩn hóa môi trường thực thi và cung cấp dịch vụ cho Application Client, Applet, Web/JSP và EJB component.",
        citation: "Chương 1 • Mục 1.4.2 • tr. 22",
      },
      {
        id: "c1-q20", level: "Hiểu",
        question: "Servlet/JSP thuộc nhóm component/container nào trong mô tả J2EE?",
        options: ["Web container", "Applet container", "Application Client container", "Chỉ EJB container"],
        correct: 0,
        why: [
          "Đúng. Web container hỗ trợ JSP và Servlet, với JSP Engine/API liên quan.",
          "Sai. Applet container dành cho applet.",
          "Sai. Application Client container dành cho chương trình client standalone.",
          "Sai. EJB container dành cho business component EJB.",
        ],
        explanation: "Web container là môi trường dành cho web-based component như Servlet và JSP.",
        citation: "Chương 1 • Mục 1.4.2 • tr. 22",
      },

      {
        id: "c1-q21", level: "Vận dụng",
        question: "Một trang chỉ hiển thị thông tin giới thiệu công ty, người dùng chỉ đọc, không cập nhật dữ liệu và chức năng đơn giản. Theo bảng trong tài liệu, nên xếp gần với loại nào nhất?",
        options: ["Website", "Web Application", "EJB container", "DNS server"],
        correct: 0,
        why: [
          "Đúng. Bảng mô tả Website thiên về nội dung, người dùng chủ yếu đọc và chức năng đơn giản.",
          "Sai. Web Application được mô tả có nhiều tương tác và thao tác dữ liệu hơn.",
          "Sai. EJB container là khái niệm Java EE, không phải loại trang theo bảng so sánh.",
          "Sai. DNS server phục vụ phân giải tên miền, không phải phân loại ứng dụng này.",
        ],
        explanation: "Dựa trên tiêu chí nội dung, mức tương tác và độ phức tạp, tình huống phù hợp với Website theo cách phân loại của chương.",
        citation: "Chương 1 • Mục 1.2.3 • tr. 17-18",
      },
      {
        id: "c1-q22", level: "Vận dụng",
        question: "Một trang giá sản phẩm phải thay đổi theo dữ liệu lưu trong database ngay khi người dùng truy cập. Luồng nào phù hợp hơn?",
        options: [
          "Browser → Web server → Web application → Database → phản hồi",
          "Browser → HTML file cố định → kết thúc, không xử lý ứng dụng",
          "Database → Browser trực tiếp, bỏ qua server",
          "Browser → DNS → máy in",
        ],
        correct: 0,
        why: [
          "Đúng. Sơ đồ web động có web application và database để tạo nội dung theo dữ liệu.",
          "Sai. Luồng này phù hợp hơn với trang tĩnh, không đáp ứng yêu cầu dữ liệu thay đổi.",
          "Sai. Tài liệu đặt web server/web application giữa client và database.",
          "Sai. Máy in không thuộc luồng xử lý web được mô tả.",
        ],
        explanation: "Nội dung phụ thuộc database cần cơ chế động: request đi tới web application, dữ liệu được xử lý rồi mới tạo response.",
        citation: "Chương 1 • Mục 1.3.5 • tr. 20-21",
      },
      {
        id: "c1-q23", level: "Vận dụng",
        question: "Người dùng nhập một tên miền vào trình duyệt. Thứ tự nào sát với mô tả hoạt động Web Server trong tài liệu nhất?",
        options: [
          "Phân giải tên miền ra IP → gửi request tới server → server trả response",
          "Gửi response trước → mới tìm IP",
          "Tạo database mới → rồi mở trình duyệt",
          "Biên dịch CSS → thay địa chỉ IP",
        ],
        correct: 0,
        why: [
          "Đúng. Tài liệu mô tả tìm IP từ tên miền, gửi yêu cầu, rồi server trả trang/phản hồi.",
          "Sai. Response chỉ có sau request và sau khi xác định nơi gửi yêu cầu.",
          "Sai. Tạo database không phải bước bắt buộc khi nhập URL.",
          "Sai. CSS không thực hiện phân giải địa chỉ mạng.",
        ],
        explanation: "Chuỗi xử lý nhấn mạnh vai trò của phân giải tên miền và mô hình request-response giữa browser với web server.",
        citation: "Chương 1 • Mục 1.3.2 • tr. 18-19",
      },
      {
        id: "c1-q24", level: "Vận dụng",
        question: "Bạn cần một server trong hệ Java Web có hỗ trợ Servlet/JSP như phần giới thiệu. Lựa chọn nào khớp trực tiếp nhất với mô tả trong tài liệu?",
        options: ["Apache Tomcat", "Microsoft Excel", "Adobe Photoshop", "SQLite Browser"],
        correct: 0,
        why: [
          "Đúng. Tài liệu mô tả Tomcat hỗ trợ Java Servlet và JSP.",
          "Sai. Excel không được nêu là web server Java Servlet/JSP.",
          "Sai. Photoshop là công cụ đồ họa, không phải web server trong danh sách.",
          "Sai. SQLite Browser không được mục web server mô tả như Servlet/JSP container.",
        ],
        explanation: "Trong các web server được liệt kê, Apache Tomcat được gắn trực tiếp với Java Servlet/JSP.",
        citation: "Chương 1 • Mục 1.3.3 • tr. 19-20",
      },
      {
        id: "c1-q25", level: "Vận dụng",
        question: "Một chương trình Java client chạy độc lập, không phải applet và không phải web component. Theo mô hình J2EE, container phù hợp là gì?",
        options: ["Application Client container", "Web container", "Applet container", "EJB container"],
        correct: 0,
        why: [
          "Đúng. Application Client container dành cho chương trình Java Application standalone chạy phía client.",
          "Sai. Web container dành cho JSP/Servlet.",
          "Sai. Applet container dành cho applet.",
          "Sai. EJB container dành cho business component EJB.",
        ],
        explanation: "Việc chọn container dựa trên loại component; ứng dụng client standalone khớp với Application Client container.",
        citation: "Chương 1 • Mục 1.4.2 • tr. 22",
      },
      {
        id: "c1-q26", level: "Vận dụng",
        question: "Nhóm muốn giảm mức thao tác API thấp khi làm giao diện Java Web và dùng một công nghệ được tài liệu mô tả là mới hơn Servlet-JSP. Chọn phương án phù hợp nhất.",
        options: ["JSF", "Trang HTML tĩnh", "DNS", "Nginx như một ngôn ngữ lập trình"],
        correct: 0,
        why: [
          "Đúng. JSF được mô tả là mới hơn và cung cấp API cấp cao hơn so với Servlet-JSP.",
          "Sai. HTML tĩnh không phải công nghệ Java Web cấp cao thay thế Servlet-JSP.",
          "Sai. DNS là cơ chế phân giải tên miền.",
          "Sai. Nginx được nêu là web server, không phải ngôn ngữ lập trình.",
        ],
        explanation: "Tình huống nhấn vào mức trừu tượng API cao hơn, nên khớp với cách tài liệu giới thiệu JSF.",
        citation: "Chương 1 • Mục 1.1.3 • tr. 16",
      },
      {
        id: "c1-q27", level: "Vận dụng",
        question: "Một hệ thống yêu cầu người dùng đăng nhập, cập nhật dữ liệu cá nhân và tương tác nhiều bước. Theo bảng so sánh, hướng nào phù hợp hơn?",
        options: ["Web Application", "Website nội dung đơn giản", "Chỉ trang HTML tĩnh", "Chỉ DNS"],
        correct: 0,
        why: [
          "Đúng. Bảng gắn Web Application với tương tác, thao tác dữ liệu, chức năng phức tạp và thường có xác thực.",
          "Sai. Website trong bảng thiên về đọc nội dung và chức năng đơn giản.",
          "Sai. HTML tĩnh không đáp ứng chuỗi tương tác/cập nhật dữ liệu được mô tả.",
          "Sai. DNS chỉ hỗ trợ phân giải tên miền, không xử lý nghiệp vụ người dùng.",
        ],
        explanation: "Các dấu hiệu xác thực, thao tác dữ liệu và luồng tương tác nhiều bước khớp mạnh với Web Application.",
        citation: "Chương 1 • Mục 1.2.3 • tr. 17-18",
      },
      {
        id: "c1-q28", level: "Vận dụng",
        question: "Một ứng dụng Java EE cần lưu và truy xuất thông tin từ hệ quản trị CSDL. Nhóm công nghệ nào trong mục 1.4.3 liên quan trực tiếp nhất?",
        options: [
          "Công nghệ truy cập CSDL và tài nguyên như JDBC/JPA",
          "Chỉ HTML heading",
          "Chỉ DNS cache",
          "Chỉ màu CSS",
        ],
        correct: 0,
        why: [
          "Đúng. Mục 1.4.3 nêu nhóm công nghệ truy cập CSDL/tài nguyên, trong đó có JDBC và Java Persistence API.",
          "Sai. Heading HTML không phải API truy cập CSDL.",
          "Sai. DNS cache không giải quyết lưu/truy xuất dữ liệu nghiệp vụ.",
          "Sai. CSS chỉ liên quan trình bày giao diện.",
        ],
        explanation: "Đối với yêu cầu persistence/truy cập dữ liệu, tài liệu trỏ tới nhóm API CSDL/tài nguyên của Java EE.",
        citation: "Chương 1 • Mục 1.4.3 • tr. 23",
      },
      {
        id: "c1-q29", level: "Vận dụng",
        question: "Một hệ thống Java EE cần cung cấp dịch vụ web theo REST hoặc SOAP như mô tả của chương. Nhóm công nghệ phù hợp là gì?",
        options: [
          "Công nghệ hỗ trợ Web Service như REST/SOAP và các API liên quan",
          "Chỉ trang HTML tĩnh",
          "Chỉ Applet container",
          "Chỉ CSS selector",
        ],
        correct: 0,
        why: [
          "Đúng. Mục 1.4.3 liệt kê nhóm công nghệ Web Service, nhắc REST, SOAP, XML/JSON và các API Java tương ứng.",
          "Sai. HTML tĩnh không phải cơ chế cung cấp REST/SOAP service.",
          "Sai. Applet container không phải nhóm Web Service được nêu.",
          "Sai. CSS selector chỉ phục vụ trình bày giao diện.",
        ],
        explanation: "Yêu cầu REST/SOAP thuộc nhóm công nghệ Web Service trong phần công nghệ Java EE.",
        citation: "Chương 1 • Mục 1.4.3 • tr. 23",
      },
      {
        id: "c1-q30", level: "Vận dụng",
        question: "Một ứng dụng Java EE cần kiểm soát quyền truy cập và xác thực người dùng. Theo mục 1.4.3, nhóm nào liên quan trực tiếp nhất?",
        options: [
          "Java EE security and container management",
          "HTML table",
          "Trang web tĩnh",
          "Chỉ cơ chế DNS",
        ],
        correct: 0,
        why: [
          "Đúng. Tài liệu nêu Java EE security/container management và nhắc cơ chế quản lý quyền truy cập, authorization và authentication.",
          "Sai. HTML table không quản lý quyền truy cập.",
          "Sai. Trang tĩnh không phải nhóm API bảo mật Java EE.",
          "Sai. DNS không cung cấp cơ chế authorization/authentication được mục này nói tới.",
        ],
        explanation: "Khi bài toán là xác thực và phân quyền, nhóm Java EE security/container management là phần được tài liệu liên hệ trực tiếp.",
        citation: "Chương 1 • Mục 1.4.3 • tr. 23",
      },
    ],
  },
  {
    id: 2,
    title: "Kiến trúc Java Web: JSP, MVC & mô hình 3 tầng",
    sourceChapters: ["Chương 2 - Cấu trúc Java Web với mô hình 3 lớp"],
    sourceCoverage: "tr. 24-32",
    ready: false,
    summary: [],
    questions: [],
  },
  {
    id: 3,
    title: "Môi trường phát triển & Java Servlet",
    sourceChapters: ["Chương 3 - Môi trường làm việc", "Chương 4 - Java Servlet và ứng dụng"],
    sourceCoverage: "tr. 33-64",
    ready: false,
    summary: [],
    questions: [],
  },
  {
    id: 4,
    title: "JSP, EL & JSTL",
    sourceChapters: ["Chương 5 - Java Server Pages (JSP), EL và JSTL"],
    sourceCoverage: "tr. 65-121",
    ready: false,
    summary: [],
    questions: [],
  },
  {
    id: 5,
    title: "HTML, CSS, Bootstrap 5, jQuery AJAX & SiteMesh",
    sourceChapters: ["Chương 6 - Bootstrap, jQuery AJAX, SiteMesh"],
    sourceCoverage: "bắt đầu tr. 122; file đính kèm hiện dừng ở tr. 150",
    ready: false,
    summary: [],
    questions: [],
  },
  {
    id: 6,
    title: "Request, Response, Cookie & Session",
    sourceChapters: ["Chương 7 - Làm việc với Request, Response, Cookie và Session"],
    sourceCoverage: "TOC ghi bắt đầu tr. 155; nội dung không có trong file 150 trang hiện tại",
    ready: false,
    summary: [],
    questions: [],
  },
  {
    id: 7,
    title: "Truy cập dữ liệu: JDBC & JPA",
    sourceChapters: ["Chương 8 - Kết nối cơ sở dữ liệu với JDBC API", "Chương 9 - Java Persistence API"],
    sourceCoverage: "TOC ghi tr. 181-235; nội dung không có trong file hiện tại",
    ready: false,
    summary: [],
    questions: [],
  },
  {
    id: 8,
    title: "Servlet Filter, Upload File & JavaMail",
    sourceChapters: ["Chương 10 - Java Servlet Filter", "Chương 11 - Upload File và Java Mail API"],
    sourceCoverage: "TOC ghi tr. 247-277; nội dung không có trong file hiện tại",
    ready: false,
    summary: [],
    questions: [],
  },
  {
    id: 9,
    title: "RESTful Web Services & triển khai Web bán hàng",
    sourceChapters: ["Chương 12 - RESTful Web Services", "Chương 13 - Triển khai trang web bán hàng"],
    sourceCoverage: "TOC ghi tr. 279-383; nội dung không có trong file hiện tại",
    ready: false,
    summary: [],
    questions: [],
  },
];

const DEFAULT_PROGRESS = {
  xp: 0,
  completedDays: [],
  wrongIds: [],
  hadWrongEver: false,
  streak: 0,
  plan: null,
};

function classNames(...items) {
  return items.filter(Boolean).join(" ");
}

function chapterById(id) {
  return CHAPTERS_DATA.find((c) => c.id === id);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function unique(arr) {
  return [...new Set(arr)];
}

function estimateMinutes(chapterCount, questionCount, goal) {
  return Math.max(12, Math.round(chapterCount * 9 + questionCount * goal.minutesPerQuestion));
}

function createRoadmap(totalDays, goalKey) {
  const days = clamp(Number(totalDays) || 14, 1, 60);
  const goal = GOALS[goalKey] || GOALS.B;
  const roadmap = [];

  const pushStudy = (chapterIds, segmentLabel = "") => {
    const count = Math.max(goal.questions, Math.round(goal.questions * Math.max(1, chapterIds.length * 0.85)));
    roadmap.push({
      day: roadmap.length + 1,
      type: "study",
      chapterIds,
      segmentLabel,
      quizCount: Math.min(30 * chapterIds.length, count),
      minutes: estimateMinutes(chapterIds.length, Math.min(30 * chapterIds.length, count), goal),
    });
  };

  const pushReview = (chapterIds, final = false) => {
    const safe = chapterIds.length ? chapterIds : [1];
    const count = Math.max(8, Math.round(goal.questions * (final ? 1.25 : 0.8)));
    roadmap.push({
      day: roadmap.length + 1,
      type: final ? "final" : "review",
      chapterIds: safe,
      segmentLabel: final ? "Tổng ôn 9 chương" : "Ôn tập xen kẽ",
      quizCount: Math.min(30, count),
      minutes: estimateMinutes(1, Math.min(30, count), goal),
    });
  };

  if (days <= 9) {
    for (let i = 0; i < days; i += 1) {
      const start = Math.floor((i * 9) / days) + 1;
      const end = Math.floor(((i + 1) * 9) / days);
      const ids = [];
      for (let id = start; id <= end; id += 1) ids.push(id);
      pushStudy(ids.length ? ids : [Math.min(9, i + 1)], ids.length > 1 ? "Cường độ cao - gộp chương" : "");
    }
    return roadmap;
  }

  if (days === 14) {
    const template = [
      ["study", [1]], ["study", [2]], ["review", [1, 2]],
      ["study", [3]], ["study", [4]], ["review", [3, 4]],
      ["study", [5]], ["study", [6]], ["review", [5, 6]],
      ["study", [7]], ["study", [8]], ["review", [7, 8]],
      ["study", [9]], ["final", [1,2,3,4,5,6,7,8,9]],
    ];
    template.forEach(([type, ids]) => {
      if (type === "study") pushStudy(ids, "1 chương/ngày");
      else pushReview(ids, type === "final");
    });
    return roadmap;
  }

  if (days < 18) {
    const reviewCount = days - 9;
    const reviewAfter = new Set();
    for (let r = 1; r <= reviewCount; r += 1) {
      reviewAfter.add(Math.min(9, Math.max(1, Math.round((r * 9) / (reviewCount + 1)))));
    }
    let chapter = 1;
    while (roadmap.length < days && chapter <= 9) {
      pushStudy([chapter], "1 chương/ngày");
      if (reviewAfter.has(chapter) && roadmap.length < days) {
        pushReview(Array.from({ length: chapter }, (_, i) => i + 1));
      }
      chapter += 1;
    }
    while (roadmap.length < days - 1) pushReview([1,2,3,4,5,6,7,8,9]);
    if (roadmap.length < days) pushReview([1,2,3,4,5,6,7,8,9], true);
    return roadmap.slice(0, days);
  }

  const reviewCount = days >= 28 ? 8 : days >= 24 ? 5 : 3;
  const studyCount = days - reviewCount;
  const assignments = Array.from({ length: studyCount }, (_, i) => 1 + Math.floor((i * 9) / studyCount));
  const reviewPositions = new Set();
  for (let r = 1; r < reviewCount; r += 1) {
    reviewPositions.add(Math.round((r * days) / reviewCount) - 1);
  }
  reviewPositions.add(days - 1);

  let studyIndex = 0;
  for (let pos = 0; pos < days; pos += 1) {
    if (reviewPositions.has(pos)) {
      const learned = unique(assignments.slice(0, studyIndex));
      pushReview(pos === days - 1 ? [1,2,3,4,5,6,7,8,9] : learned, pos === days - 1);
    } else {
      const id = assignments[Math.min(studyIndex, assignments.length - 1)];
      const occurrence = assignments.slice(0, studyIndex + 1).filter((x) => x === id).length;
      const totalOccurrence = assignments.filter((x) => x === id).length;
      pushStudy([id], totalOccurrence > 1 ? `Phần ${occurrence}/${totalOccurrence}` : "");
      studyIndex += 1;
    }
  }
  return roadmap.slice(0, days).map((item, i) => ({ ...item, day: i + 1 }));
}

function seededSort(items, seed) {
  const hash = (str) => {
    let h = 2166136261;
    for (let i = 0; i < str.length; i += 1) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };
  return [...items].sort((a, b) => hash(`${seed}-${a.id}`) - hash(`${seed}-${b.id}`));
}

function pickQuestions(chapterIds, count, goalKey, seed) {
  const goal = GOALS[goalKey] || GOALS.B;
  const pool = chapterIds.flatMap((id) => chapterById(id)?.questions || []);
  if (!pool.length) return [];

  const appliedTarget = Math.round(count * goal.appliedRatio);
  const remaining = Math.max(0, count - appliedTarget);
  const knowTarget = Math.ceil(remaining / 2);
  const understandTarget = Math.floor(remaining / 2);
  const targets = {
    "Nhận biết": knowTarget,
    "Hiểu": understandTarget,
    "Vận dụng": appliedTarget,
  };

  const selected = [];
  ["Nhận biết", "Hiểu", "Vận dụng"].forEach((level) => {
    const levelPool = seededSort(pool.filter((q) => q.level === level), `${seed}-${level}`);
    selected.push(...levelPool.slice(0, Math.min(levelPool.length, targets[level])));
  });

  if (selected.length < Math.min(count, pool.length)) {
    const chosen = new Set(selected.map((q) => q.id));
    const leftovers = seededSort(pool.filter((q) => !chosen.has(q.id)), `${seed}-fill`);
    selected.push(...leftovers.slice(0, Math.min(count, pool.length) - selected.length));
  }

  return seededSort(selected, `${seed}-final`);
}

function loadProgress() {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function Badge({ children }) {
  return <span className="inline-flex items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-700">{children}</span>;
}

function Mascot({ mood = "happy", className = "" }) {
  const faces = { happy: "🐰", focus: "🐱", win: "🐰✨", sad: "🐱💭" };
  return (
    <div className={classNames("select-none text-5xl drop-shadow-sm", mood === "win" && "animate-bounce", className)} aria-hidden="true">
      {faces[mood] || faces.happy}
    </div>
  );
}

function Card({ children, className = "" }) {
  return <div className={classNames("rounded-3xl border border-pink-100 bg-white p-5 shadow-xl shadow-pink-100/50", className)}>{children}</div>;
}

function ProgressBar({ value, label }) {
  return (
    <div>
      {label && <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-600"><span>{label}</span><span>{Math.round(value)}%</span></div>}
      <div className="h-3 overflow-hidden rounded-full bg-pink-100">
        <div className="h-full rounded-full bg-pink-400 transition-all duration-500" style={{ width: `${clamp(value, 0, 100)}%` }} />
      </div>
    </div>
  );
}

function AppShell({ onHome, screen, progress, children }) {
  const level = Math.floor(progress.xp / 500) + 1;
  const levelProgress = ((progress.xp % 500) / 500) * 100;
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50 text-slate-800">
      <header className="sticky top-0 z-40 border-b border-pink-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button onClick={onHome} className="inline-flex items-center gap-2 rounded-2xl border border-pink-200 bg-white px-3 py-2 text-sm font-bold text-pink-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-pink-50">
            <span aria-hidden="true">←</span> Trang chủ
          </button>
          <div className="min-w-0 flex-1 text-center">
            <div className="truncate text-sm font-black text-pink-700">JAVA WEB QUEST</div>
            <div className="mx-auto mt-1 hidden max-w-xs sm:block"><ProgressBar value={levelProgress} /></div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold sm:text-sm">
            <Badge>🔥 {progress.streak}</Badge>
            <Badge>Lv.{level} • {progress.xp} XP</Badge>
          </div>
        </div>
      </header>
      <main className={classNames("mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8", screen === "quiz" && "max-w-4xl")}>{children}</main>
    </div>
  );
}

export default function JavaWebQuestApp() {
  const [progress, setProgress] = useState(loadProgress);
  const [screen, setScreen] = useState(progress.plan ? "home" : "duration");
  const [selectedDays, setSelectedDays] = useState(progress.plan?.totalDays || 14);
  const [customDays, setCustomDays] = useState("");
  const [goalKey, setGoalKey] = useState(progress.plan?.goalKey || "B");
  const [activeDayIndex, setActiveDayIndex] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  const roadmap = progress.plan?.roadmap || [];
  const goal = GOALS[goalKey] || GOALS.B;

  const completedChapterIds = useMemo(() => {
    return CHAPTERS_DATA.filter((chapter) => {
      const related = roadmap.filter((d) => d.type === "study" && d.chapterIds.includes(chapter.id));
      return related.length > 0 && related.every((d) => progress.completedDays.includes(d.day));
    }).map((c) => c.id);
  }, [roadmap, progress.completedDays]);

  const overallProgress = (completedChapterIds.length / 9) * 100;
  const badges = useMemo(() => {
    const items = [];
    if (progress.completedDays.length >= 3) items.push("🌸 Day 3");
    if (progress.completedDays.length >= 7) items.push("🏅 Day 7");
    if (progress.hadWrongEver && progress.wrongIds.length === 0) items.push("🧹 Sổ sai = 0");
    if (completedChapterIds.length === 9) items.push("👑 100% lộ trình");
    return items;
  }, [progress.completedDays.length, progress.hadWrongEver, progress.wrongIds.length, completedChapterIds.length]);

  function guardedHome() {
    if (screen === "quiz" && quiz && quiz.index < quiz.questions.length) {
      const ok = typeof window === "undefined" ? true : window.confirm("Bạn đang làm quiz dở. Thoát về trang chủ sẽ giữ sổ tay câu sai và XP đã nhận, nhưng lượt quiz hiện tại sẽ kết thúc. Bạn vẫn muốn thoát?");
      if (!ok) return;
    }
    setQuiz(null);
    setResult(null);
    setScreen("home");
  }

  function chooseDays(days) {
    setSelectedDays(days);
    setCustomDays("");
  }

  function goGoal() {
    const days = customDays ? clamp(Number(customDays), 1, 60) : selectedDays;
    setSelectedDays(days);
    setScreen("goal");
  }

  function createPlan() {
    const newRoadmap = createRoadmap(selectedDays, goalKey);
    setProgress((p) => ({
      ...p,
      plan: { totalDays: selectedDays, goalKey, roadmap: newRoadmap },
      completedDays: [],
      wrongIds: [],
      hadWrongEver: false,
      streak: 0,
      xp: 0,
    }));
    setScreen("home");
  }

  function openDay(index) {
    const item = roadmap[index];
    if (!item) return;
    const unlocked = index === 0 || progress.completedDays.includes(item.day) || progress.completedDays.includes(roadmap[index - 1]?.day);
    if (!unlocked) return;
    setActiveDayIndex(index);
    setScreen("lesson");
  }

  function startDayQuiz() {
    const day = roadmap[activeDayIndex];
    if (!day) return;
    const questions = pickQuestions(day.chapterIds, day.quizCount, progress.plan.goalKey, `day-${day.day}`);
    if (!questions.length) return;
    setQuiz({
      mode: "day",
      dayIndex: activeDayIndex,
      dayNumber: day.day,
      questions,
      index: 0,
      selected: null,
      answers: [],
      startedAt: Date.now(),
      dayWrongIds: [],
    });
    setScreen("quiz");
  }

  function startWrongRetry(scopeIds = null, origin = "home") {
    const ids = scopeIds ? scopeIds.filter((id) => progress.wrongIds.includes(id)) : progress.wrongIds;
    const allQuestions = CHAPTERS_DATA.flatMap((c) => c.questions);
    const questions = ids.map((id) => allQuestions.find((q) => q.id === id)).filter(Boolean);
    if (!questions.length) return;
    setQuiz({
      mode: "retry",
      origin,
      dayIndex: activeDayIndex,
      dayNumber: activeDayIndex != null ? roadmap[activeDayIndex]?.day : null,
      questions: seededSort(questions, `retry-${Date.now()}`),
      index: 0,
      selected: null,
      answers: [],
      startedAt: Date.now(),
      dayWrongIds: [],
    });
    setScreen("quiz");
  }

  function answerQuestion(optionIndex) {
    if (!quiz || quiz.selected !== null) return;
    const q = quiz.questions[quiz.index];
    const isCorrect = optionIndex === q.correct;

    setProgress((p) => {
      let wrongIds = p.wrongIds;
      let xpGain = 0;
      let hadWrongEver = p.hadWrongEver;

      if (quiz.mode === "retry") {
        if (isCorrect) {
          wrongIds = p.wrongIds.filter((id) => id !== q.id);
          xpGain = 5;
        } else {
          wrongIds = unique([...p.wrongIds, q.id]);
          hadWrongEver = true;
        }
      } else if (isCorrect) {
        xpGain = 10;
      } else {
        wrongIds = unique([...p.wrongIds, q.id]);
        hadWrongEver = true;
      }

      return { ...p, wrongIds, xp: p.xp + xpGain, hadWrongEver };
    });

    setQuiz((prev) => ({
      ...prev,
      selected: optionIndex,
      answers: [...prev.answers, { questionId: q.id, selected: optionIndex, correct: isCorrect }],
      dayWrongIds: isCorrect ? prev.dayWrongIds : unique([...prev.dayWrongIds, q.id]),
    }));
  }

  function nextQuestion() {
    if (!quiz || quiz.selected === null) return;
    if (quiz.index < quiz.questions.length - 1) {
      setQuiz((prev) => ({ ...prev, index: prev.index + 1, selected: null }));
      return;
    }
    finishQuiz();
  }

  function finishQuiz() {
    if (!quiz) return;
    const elapsedMs = Date.now() - quiz.startedAt;
    const correctCount = quiz.answers.filter((a) => a.correct).length;
    const wrongCount = quiz.answers.length - correctCount;
    const accuracy = quiz.answers.length ? Math.round((correctCount / quiz.answers.length) * 100) : 0;
    let bonus = 0;
    let streakBonus = 0;
    let firstCompletion = false;

    if (quiz.mode === "day") {
      const dayNumber = quiz.dayNumber;
      firstCompletion = !progress.completedDays.includes(dayNumber);
      if (firstCompletion) {
        const nextStreak = progress.streak + 1;
        bonus = 50;
        streakBonus = Math.min(50, nextStreak * 5);
        setProgress((p) => ({
          ...p,
          completedDays: unique([...p.completedDays, dayNumber]),
          streak: p.streak + 1,
          xp: p.xp + bonus + streakBonus,
        }));
      }
    }

    setResult({
      mode: quiz.mode,
      correctCount,
      wrongCount,
      accuracy,
      elapsedMs,
      dayWrongIds: quiz.dayWrongIds,
      bonus,
      streakBonus,
      firstCompletion,
      dayNumber: quiz.dayNumber,
    });
    setScreen("result");
  }

  function formatTime(ms) {
    const sec = Math.max(1, Math.floor(ms / 1000));
    const min = Math.floor(sec / 60);
    const rest = sec % 60;
    return `${min}:${String(rest).padStart(2, "0")}`;
  }

  function continueJourney() {
    if (result?.mode === "day" && activeDayIndex != null && activeDayIndex < roadmap.length - 1) {
      setActiveDayIndex(activeDayIndex + 1);
      setResult(null);
      setQuiz(null);
      setScreen("lesson");
      return;
    }
    guardedHome();
  }

  function resetPlan() {
    const ok = typeof window === "undefined" ? true : window.confirm("Tạo lại lộ trình sẽ xoá XP, streak, ngày đã hoàn thành và sổ tay câu sai của lộ trình hiện tại. Tiếp tục?");
    if (!ok) return;
    setProgress(DEFAULT_PROGRESS);
    setSelectedDays(14);
    setGoalKey("B");
    setCustomDays("");
    setScreen("duration");
  }

  if (screen === "duration") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50 px-4 py-8 text-slate-800 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <Mascot className="mx-auto mb-3" />
            <Badge>EdTech • Gamification • Java Web</Badge>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">Bạn muốn chinh phục môn này trong bao lâu?</h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">Ứng dụng luôn giữ đủ 9 học phần game. Số ngày chỉ thay đổi cách gộp, chia nhỏ và xen kẽ ôn tập.</p>
          </div>

          <Card>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[7, 14, 21, 30].map((days) => (
                <button key={days} onClick={() => chooseDays(days)} className={classNames("rounded-3xl border p-5 text-left transition hover:-translate-y-1", selectedDays === days && !customDays ? "border-pink-400 bg-pink-50 shadow-md" : "border-pink-100 bg-white hover:border-pink-300")}>
                  <div className="text-2xl font-black text-pink-600">{days} ngày</div>
                  <div className="mt-1 text-xs font-semibold text-slate-500">{days === 7 ? "Cường độ cao" : days === 14 ? "Chuẩn cân bằng" : days === 21 ? "Chia nhỏ sâu" : "Bền vững + tổng ôn"}</div>
                </button>
              ))}
            </div>
            <div className="mt-5 rounded-3xl bg-rose-50 p-4">
              <label className="text-sm font-bold text-slate-700">Hoặc tự nhập số ngày (1-60)</label>
              <input value={customDays} onChange={(e) => setCustomDays(e.target.value.replace(/\D/g, "").slice(0, 2))} onFocus={() => setSelectedDays(null)} placeholder="Ví dụ: 18" className="mt-2 w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 text-base font-semibold outline-none ring-pink-200 transition focus:ring-4" />
            </div>
            <button onClick={goGoal} disabled={!selectedDays && !Number(customDays)} className="mt-6 w-full rounded-2xl bg-pink-500 px-5 py-4 text-base font-black text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-40">Tiếp tục chọn mục tiêu →</button>
          </Card>
        </div>
      </div>
    );
  }

  if (screen === "goal") {
    const previewRoadmap = createRoadmap(selectedDays, goalKey);
    const avgQuiz = Math.round(previewRoadmap.reduce((sum, d) => sum + d.quizCount, 0) / previewRoadmap.length);
    const avgMinutes = Math.round(previewRoadmap.reduce((sum, d) => sum + d.minutes, 0) / previewRoadmap.length);
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50 px-4 py-8 text-slate-800 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <button onClick={() => setScreen("duration")} className="mb-5 rounded-2xl border border-pink-200 bg-white px-4 py-2 text-sm font-bold text-pink-700">← Quay lại</button>
          <div className="mb-7 text-center">
            <Mascot mood="focus" className="mx-auto mb-3" />
            <h1 className="text-3xl font-black sm:text-4xl">Bạn muốn đạt mục tiêu điểm nào?</h1>
            <p className="mt-2 text-slate-600">Adaptive Difficulty sẽ tăng số câu và tỉ lệ Vận dụng khi mục tiêu cao hơn.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(GOALS).map(([key, cfg]) => (
              <button key={key} onClick={() => setGoalKey(key)} className={classNames("rounded-3xl border p-5 text-left transition hover:-translate-y-1", goalKey === key ? "border-pink-400 bg-pink-50 shadow-md" : "border-pink-100 bg-white hover:border-pink-300")}>
                <div className="flex items-center justify-between"><span className="text-2xl font-black text-pink-600">{cfg.label}</span><span className="text-xs font-bold text-slate-500">≈ {cfg.questions} câu/ngày</span></div>
                <div className="mt-2 text-xs leading-5 text-slate-600">{cfg.note}</div>
                <div className="mt-3 text-xs font-bold text-pink-700">Vận dụng ~{Math.round(cfg.appliedRatio * 100)}%</div>
              </button>
            ))}
          </div>

          <Card className="mt-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-pink-50 p-4"><div className="text-xs font-bold uppercase tracking-wide text-pink-600">Lộ trình</div><div className="mt-1 text-2xl font-black">{selectedDays} ngày</div></div>
              <div className="rounded-2xl bg-pink-50 p-4"><div className="text-xs font-bold uppercase tracking-wide text-pink-600">Quiz trung bình</div><div className="mt-1 text-2xl font-black">~{avgQuiz} câu/ngày</div></div>
              <div className="rounded-2xl bg-pink-50 p-4"><div className="text-xs font-bold uppercase tracking-wide text-pink-600">Workload</div><div className="mt-1 text-2xl font-black">~{avgMinutes} phút/ngày</div></div>
            </div>
            <button onClick={createPlan} className="mt-6 w-full rounded-2xl bg-pink-500 px-5 py-4 text-base font-black text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-600">Tạo lộ trình học ngay ✨</button>
          </Card>
        </div>
      </div>
    );
  }

  const shell = (content) => <AppShell onHome={guardedHome} screen={screen} progress={progress}>{content}</AppShell>;

  if (screen === "home") {
    return shell(
      <div className="space-y-6">
        <section className="grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
          <Card className="overflow-hidden bg-gradient-to-br from-white to-pink-50">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Badge>🎯 Mục tiêu {progress.plan.goalKey} • {progress.plan.totalDays} ngày</Badge>
                <h1 className="mt-3 text-3xl font-black text-slate-900">Bản đồ chinh phục lộ trình</h1>
                <p className="mt-2 text-sm leading-6 text-slate-600">Hoàn thành DAY hiện tại để mở khóa DAY kế tiếp. Tiến độ tổng tính theo 9 học phần game.</p>
              </div>
              <Mascot mood="happy" />
            </div>
            <div className="mt-6"><ProgressBar value={overallProgress} label="Tiến độ 9 chương" /></div>
          </Card>

          <Card>
            <div className="text-sm font-black text-slate-900">Sổ tay câu sai</div>
            <div className="mt-2 text-4xl font-black text-pink-600">{progress.wrongIds.length}</div>
            <p className="mt-1 text-xs leading-5 text-slate-500">Trả lời đúng khi luyện lại sẽ gỡ câu khỏi sổ và cộng +5 XP.</p>
            <button disabled={!progress.wrongIds.length} onClick={() => startWrongRetry()} className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30">Luyện lại câu sai ({progress.wrongIds.length} câu)</button>
          </Card>
        </section>

        {badges.length > 0 && (
          <Card>
            <div className="mb-3 text-sm font-black">Huy hiệu đã mở</div>
            <div className="flex flex-wrap gap-2">{badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>
          </Card>
        )}

        <section className="space-y-3">
          {roadmap.map((day, index) => {
            const completed = progress.completedDays.includes(day.day);
            const unlocked = index === 0 || completed || progress.completedDays.includes(roadmap[index - 1]?.day);
            const titles = day.chapterIds.map((id) => `Ch.${id} ${chapterById(id)?.title || ""}`).join(" • ");
            return (
              <button key={`${day.day}-${day.type}`} onClick={() => openDay(index)} disabled={!unlocked} className={classNames("w-full rounded-3xl border p-4 text-left shadow-sm transition sm:p-5", completed ? "border-emerald-200 bg-emerald-50" : unlocked ? "border-pink-200 bg-white hover:-translate-y-0.5 hover:shadow-md" : "cursor-not-allowed border-slate-100 bg-slate-50 opacity-55")}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2"><Badge>DAY {day.day}</Badge><span className="text-xs font-bold text-slate-500">{day.type === "study" ? "HỌC" : day.type === "final" ? "TỔNG ÔN" : "ÔN TẬP"}</span>{day.segmentLabel && <span className="text-xs font-bold text-pink-600">• {day.segmentLabel}</span>}</div>
                    <div className="mt-2 font-black text-slate-900">{titles}</div>
                    <div className="mt-1 text-xs text-slate-500">⏱ {day.minutes} phút • ❓ {day.quizCount} câu • 🎚 Adaptive {progress.plan.goalKey}</div>
                  </div>
                  <div className="shrink-0 text-sm font-black">{completed ? "✅ Đã hoàn thành" : unlocked ? "🌸 Đang mở" : "🔒 Đã khóa"}</div>
                </div>
              </button>
            );
          })}
        </section>

        <div className="flex justify-end"><button onClick={resetPlan} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50">Tạo lại lộ trình</button></div>
      </div>
    );
  }

  if (screen === "lesson") {
    const day = roadmap[activeDayIndex];
    const chapters = day.chapterIds.map(chapterById).filter(Boolean);
    const readyQuestions = chapters.reduce((sum, c) => sum + c.questions.length, 0);
    const summaries = chapters.flatMap((c) => c.summary.map((item) => ({ chapter: c.id, item }))).slice(0, 14);
    return shell(
      <div className="space-y-5">
        <Card className="bg-gradient-to-br from-white to-pink-50">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge>DAY {day.day} • {day.type === "study" ? "Học mới" : day.type === "final" ? "Tổng ôn" : "Ôn tập"}</Badge>
              <h1 className="mt-3 text-3xl font-black">{day.chapterIds.map((id) => `Chương ${id}: ${chapterById(id)?.title}`).join(" + ")}</h1>
              <p className="mt-2 text-sm text-slate-600">⏱ {day.minutes} phút dự kiến • ❓ {day.quizCount} câu</p>
            </div>
            <Mascot mood="focus" />
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black">Tóm tắt kiến thức</h2><Badge>Bullet notes</Badge></div>
          {summaries.length ? (
            <ul className="space-y-3">
              {summaries.map((row, i) => <li key={`${row.chapter}-${i}`} className="flex gap-3 rounded-2xl bg-pink-50/70 p-3 text-sm leading-6"><span className="font-black text-pink-500">•</span><span>{row.item}</span></li>)}
            </ul>
          ) : (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">Dữ liệu kiến thức của học phần này chưa được chèn trong lượt hiện tại. Khung app vẫn giữ đủ 9 học phần; khi bạn thêm object chương tương ứng vào <b>CHAPTERS_DATA</b>, màn này và quiz sẽ hoạt động tự động.</div>
          )}
        </Card>

        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div><div className="text-lg font-black">Sẵn sàng vào Quest?</div><div className="mt-1 text-sm text-slate-500">Hiện có {readyQuestions} câu dữ liệu khả dụng cho DAY này.</div></div>
            <button disabled={!readyQuestions} onClick={startDayQuiz} className="rounded-2xl bg-pink-500 px-6 py-3 font-black text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30">Bắt đầu quiz 🚀</button>
          </div>
        </Card>
      </div>
    );
  }

  if (screen === "quiz" && quiz) {
    const q = quiz.questions[quiz.index];
    const answered = quiz.selected !== null;
    const isCorrect = answered && quiz.selected === q.correct;
    const qProgress = ((quiz.index + (answered ? 1 : 0)) / quiz.questions.length) * 100;
    return shell(
      <div className="space-y-5">
        <Card>
          <div className="flex items-center justify-between gap-3"><div><Badge>{quiz.mode === "retry" ? "SỔ TAY CÂU SAI" : `DAY ${quiz.dayNumber}`}</Badge><div className="mt-2 text-sm font-bold text-slate-500">Câu {quiz.index + 1}/{quiz.questions.length} • {q.level}</div></div><Mascot mood={answered ? (isCorrect ? "win" : "sad") : "focus"} className="text-4xl" /></div>
          <div className="mt-4"><ProgressBar value={qProgress} /></div>
        </Card>

        <Card className={classNames("transition", answered && (isCorrect ? "ring-4 ring-emerald-100" : "ring-4 ring-rose-100"))}>
          <h1 className="text-xl font-black leading-8 sm:text-2xl">{q.question}</h1>
          <div className="mt-5 grid gap-3">
            {q.options.map((option, idx) => {
              const selected = quiz.selected === idx;
              const correct = q.correct === idx;
              return (
                <button key={idx} disabled={answered} onClick={() => answerQuestion(idx)} className={classNames("rounded-2xl border p-4 text-left text-sm font-semibold leading-6 transition", !answered && "border-pink-100 bg-white hover:-translate-y-0.5 hover:border-pink-300 hover:bg-pink-50", answered && correct && "border-emerald-300 bg-emerald-50 text-emerald-900", answered && selected && !correct && "border-rose-300 bg-rose-50 text-rose-900", answered && !selected && !correct && "border-slate-100 bg-slate-50 text-slate-500")}>
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black shadow-sm">{String.fromCharCode(65 + idx)}</span>{option}
                </button>
              );
            })}
          </div>
        </Card>

        {answered && (
          <Card className={isCorrect ? "border-emerald-200" : "border-rose-200"}>
            <div className={classNames("text-lg font-black", isCorrect ? "text-emerald-700" : "text-rose-700")}>{isCorrect ? (quiz.mode === "retry" ? "Đúng rồi! +5 XP và đã gỡ khỏi sổ câu sai 🎉" : "Chính xác! +10 XP 🎉") : "Chưa đúng — câu này đã được giữ trong Sổ tay câu sai"}</div>
            <p className="mt-3 text-sm leading-6 text-slate-700">{q.explanation}</p>
            <div className="mt-4 space-y-2">
              {q.options.map((option, idx) => (
                <div key={idx} className={classNames("rounded-2xl p-3 text-sm leading-6", idx === q.correct ? "bg-emerald-50 text-emerald-900" : "bg-slate-50 text-slate-600")}>
                  <b>{String.fromCharCode(65 + idx)}. {idx === q.correct ? "Vì sao đúng:" : "Vì sao sai:"}</b> {q.why[idx]}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-pink-50 p-3 text-xs font-bold text-pink-700">📖 Trích dẫn: {q.citation}</div>
            <button onClick={nextQuestion} className="mt-5 w-full rounded-2xl bg-slate-900 px-5 py-3 font-black text-white transition hover:-translate-y-0.5">{quiz.index === quiz.questions.length - 1 ? "Hoàn tất Quest →" : "Câu tiếp theo →"}</button>
          </Card>
        )}
      </div>
    );
  }

  if (screen === "result" && result) {
    const accuracyColor = result.accuracy >= 80 ? "text-emerald-600" : result.accuracy >= 60 ? "text-amber-600" : "text-rose-600";
    return shell(
      <div className="mx-auto max-w-3xl space-y-5">
        <Card className="text-center bg-gradient-to-br from-white to-pink-50">
          <Mascot mood="win" className="mx-auto" />
          <Badge>{result.mode === "day" ? "QUEST COMPLETED" : "RETRY COMPLETED"}</Badge>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">{result.mode === "day" ? `DAY ${result.dayNumber} hoàn thành!` : "Luyện câu sai hoàn tất!"}</h1>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-emerald-50 p-4"><div className="text-xs font-bold text-emerald-700">Đúng</div><div className="mt-1 text-2xl font-black">{result.correctCount}</div></div>
            <div className="rounded-2xl bg-rose-50 p-4"><div className="text-xs font-bold text-rose-700">Sai</div><div className="mt-1 text-2xl font-black">{result.wrongCount}</div></div>
            <div className="rounded-2xl bg-pink-50 p-4"><div className="text-xs font-bold text-pink-700">Độ chính xác</div><div className={classNames("mt-1 text-2xl font-black", accuracyColor)}>{result.accuracy}%</div></div>
            <div className="rounded-2xl bg-slate-50 p-4"><div className="text-xs font-bold text-slate-600">Thời gian</div><div className="mt-1 text-2xl font-black">{formatTime(result.elapsedMs)}</div></div>
          </div>
          {result.mode === "day" && result.firstCompletion && <div className="mt-4 rounded-2xl bg-amber-50 p-3 text-sm font-bold text-amber-800">🎁 Hoàn thành DAY: +{result.bonus} XP • Bonus streak: +{result.streakBonus} XP</div>}
          <div className="mt-3 text-sm font-bold text-pink-700">Tổng XP hiện tại: {progress.xp} XP</div>
        </Card>

        <Card>
          <div className="grid gap-3">
            <button disabled={!result.dayWrongIds.length} onClick={() => startWrongRetry(result.dayWrongIds, "result")} className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 font-black text-rose-700 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30">Làm lại câu sai ({result.dayWrongIds.filter((id) => progress.wrongIds.includes(id)).length} câu)</button>
            {result.mode === "day" && <button onClick={continueJourney} className="rounded-2xl bg-pink-500 px-5 py-3 font-black text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5">Tiếp tục hành trình & Mở khóa ngày tiếp theo →</button>}
            <button onClick={guardedHome} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-black text-slate-700 transition hover:bg-slate-50">Về trang chủ</button>
          </div>
        </Card>
      </div>
    );
  }

  return shell(<Card>Không tìm thấy màn hình.</Card>);
}
