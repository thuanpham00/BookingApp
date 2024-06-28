# sử dụng API của Amadeus

## Các package đã cài

- yarn add @tanstack/react-query
- yarn add @tanstack/react-query-devtools
- yarn add react-router-dom
- yarn add react-helmet-async
- yarn add react-toastify
- yarn add axios
- yarn add react-hook-form
- yarn add @hookform/resolvers yup
- yarn add firebase
- yarn add @floating-ui/react
- yarn add framer-motion

## ÔN TẬP KIẾN THỨC

- useSearchParams() - dùng để lấy các `tham số truy vấn` trên URL xuống (page, limit, ....)
- useParams() - dùng để lấy các `tham số định danh` trên URL xuống (id...)

- sử dụng setInterval và setTimeout nhớ clear nó đi

- dùng setValue của `react-hook-form` đảm bảo rằng giá trị của input được quản lý và cập nhật chính xác

## Firebase

- createUserWithEmailAndPassword() - hàm tạo tài khoản user email & password
- signInWithEmailAndPassword() - hàm đăng nhập user
- signInWithPopup() - hàm đăng nhập google (popup)

## API

### Flight booking

1. Flight Offers Search API: Bước đầu tiên là tìm kiếm các ưu đãi chuyến bay dựa trên các thông tin như điểm đi, điểm đến, ngày đi, ngày về và số lượng hành khách. API này sẽ trả về danh sách các ưu đãi chuyến bay phù hợp với yêu cầu tìm kiếm của bạn.

2. Flight Offers Price API: Sau khi có danh sách các ưu đãi chuyến bay từ bước trên, bạn sử dụng API này để lấy thông tin chi tiết về giá cả của từng ưu đãi, bao gồm giá cuối cùng, thuế, phí và các chi tiết khác liên quan đến việc đặt vé.

3. Flight Create Orders API: Khi bạn đã chọn được ưu đãi chuyến bay và biết giá cả cụ thể, bạn có thể sử dụng API này để tạo đơn đặt hàng mới. Bạn cần cung cấp thông tin chi tiết về hành khách, yêu cầu đặc biệt và thông tin thanh toán để hoàn thành quá trình đặt vé.

4. Flight Order Management API: Sau khi đã tạo thành công đơn đặt hàng, bạn có thể sử dụng API này để quản lý các đơn đặt hàng đã được tạo. Các chức năng bao gồm lấy thông tin chi tiết đơn hàng, cập nhật thông tin và hủy đơn hàng khi cần thiết.

5. Seatmap Display API: Nếu cần thiết, bạn có thể sử dụng API này để hiển thị bản đồ ghế của các chuyến bay đã đặt, giúp người dùng lựa chọn vị trí ngồi phù hợp.

6. Branded Fares Upsell API: Nếu bạn muốn cung cấp cho khách hàng các lựa chọn hạng vé khác nhau hoặc nâng cao giá trị bán hàng, bạn có thể sử dụng API này để bán các hạng vé thương hiệu (branded fares).

7. Flight Price Analysis API: API này có thể được sử dụng bất cứ lúc nào để phân tích giá cả của các chuyến bay, giúp bạn hiểu rõ hơn về các mẫu giá và xu hướng giá cả.

8. Flight Choice Prediction API: Nếu bạn muốn cung cấp các đề xuất chuyến bay dựa trên dữ liệu lịch sử và hành vi của khách hàng, bạn có thể sử dụng API này để dự đoán các lựa chọn chuyến bay phù hợp.

### Lỗi tồn động :

- lỗi ref tại Calender
- làm thêm hàm chuyển 2 giá trị airport chéo
- làm nốt phần tổng số hành khách, thêm button vào
