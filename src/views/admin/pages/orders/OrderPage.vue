<template>
  <div class="order-page">
    <h1>Quản lý đơn hàng</h1>

    <!-- Phần lọc trạng thái đơn hàng -->
    <div class="filter-section mb-3">
      <label for="filterStatus" class="form-label">Lọc theo trạng thái:</label>
      <select
        class="form-control"
        id="filterStatus"
        v-model="filterStatus"
        @change="filterOrders"
      >
        <option value="">Tất cả</option>
        <option value="Đang chờ xử lý">Đang chờ xử lý</option>
        <option value="Đang giao hàng">Đang giao hàng</option>
        <option value="Đã hoàn thành">Đã hoàn thành</option>
      </select>
    </div>

    <!-- Phần danh sách đơn hàng -->
    <div class="order-list card">
      <div class="card-header">
        <h2 class="h5 mb-0">Danh sách đơn hàng</h2>
      </div>
      <div class="card-body">
        <ul class="list-group">
          <li
            v-for="order in filteredOrders"
            :key="order.id"
            class="list-group-item"
          >
            <div
              class="order-item d-flex justify-content-between align-items-center"
            >
              <div class="order-info">
                <span><strong>ID:</strong> {{ order.id }}</span>
                <span
                  ><strong>Tên khách hàng:</strong>
                  {{ order.customerName }}</span
                >
                <span
                  ><strong>Ngày đặt hàng:</strong> {{ order.orderDate }}</span
                >
                <span
                  :class="getStatusClass(order.status)"
                  @click="viewOrderDetails(order.id)"
                  class="status-indicator"
                >
                  <i :class="getStatusIcon(order.status)"></i>
                  {{ order.status }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Modal chi tiết đơn hàng -->
    <div v-if="showOrderModal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="h5 mb-0">Chi tiết đơn hàng</h2>
          <button
            type="button"
            class="btn-close"
            @click="closeOrderModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <ul class="list-group">
            <li>
              <strong>Tên khách hàng:</strong>
              {{ selectedOrder.customerName }}
            </li>
            <li>
              <strong>Ngày đặt hàng:</strong> {{ selectedOrder.orderDate }}
            </li>
            <li><strong>Email:</strong> {{ selectedOrder.email }}</li>
            <li><strong>Số điện thoại:</strong> {{ selectedOrder.phone }}</li>
            <li>
              <strong>Địa chỉ giao hàng:</strong> {{ selectedOrder.address }}
            </li>
            <li>
              <strong>Trạng thái:</strong>
              <span :class="getStatusClass(selectedOrder.status)">
                <i :class="getStatusIcon(selectedOrder.status)"></i>
                {{ selectedOrder.status }}
              </span>
            </li>
            <li>
              <strong>Danh sách sản phẩm:</strong>
              <table class="table table-striped mt-2">
                <thead class="table-primary">
                  <tr>
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Đơn giá</th>
                    <th scope="col">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in selectedOrder.items" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.quantity * item.price }}</td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li class="list-group-item list-group-item-primary">
              <strong>Tổng cộng:</strong>
              {{ calculateTotal(selectedOrder.items) }}
            </li>
          </ul>
          <div class="text-center mt-3">
            <button
              class="btn btn-primary"
              @click="updateOrderStatus('Đang chờ xử lý')"
            >
              <i class="bi bi-hourglass-split"></i> Đang chờ xử lý
            </button>
            <button
              class="btn btn-info"
              @click="updateOrderStatus('Đang giao hàng')"
            >
              <i class="bi bi-truck"></i> Đang giao hàng
            </button>
            <button
              class="btn btn-success"
              @click="updateOrderStatus('Đã hoàn thành')"
            >
              <i class="bi bi-check-circle"></i> Đã hoàn thành
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "OrderPage",
  data() {
    return {
      orders: [
        {
          id: 1,
          customerName: "Nguyễn Văn A",
          orderDate: "2025-01-01",
          status: "Đang chờ xử lý",
          components: "Thành phần 1",
          email: "nguyenvana@gmail.com",
          phone: "0123456789",
          address: "123 Đường ABC, Quận X, TP. HCM",
          items: [
            { name: "Sản phẩm 1", quantity: 2, price: 100 },
            { name: "Sản phẩm 2", quantity: 1, price: 200 },
          ],
        },
        {
          id: 2,
          customerName: "Trần Thị B",
          orderDate: "2025-01-02",
          status: "Đang giao hàng",
          components: "Thành phần 2",
          email: "tranthib@gmail.com",
          phone: "0987654321",
          address: "456 Đường XYZ, Quận Y, TP. HCM",
          items: [
            { name: "Sản phẩm 3", quantity: 1, price: 150 },
            { name: "Sản phẩm 4", quantity: 3, price: 50 },
          ],
        },
        {
          id: 3,
          customerName: "Lê Văn C",
          orderDate: "2025-01-03",
          status: "Đã hoàn thành",
          components: "Thành phần 3",
          email: "levanc@gmail.com",
          phone: "0345678901",
          address: "789 Đường DEF, Quận Z, TP. HCM",
          items: [
            { name: "Sản phẩm 5", quantity: 2, price: 100 },
            { name: "Sản phẩm 6", quantity: 4, price: 75 },
          ],
        },
        // Thêm các đơn hàng khác tại đây
      ],
      filterStatus: "",
      filteredOrders: [],
      showOrderModal: false,
      selectedOrder: {},
    };
  },
  created() {
    this.filteredOrders = this.orders;
  },
  methods: {
    getStatusClass(status) {
      switch (status) {
        case "Đang chờ xử lý":
          return "text-warning";
        case "Đang giao hàng":
          return "text-info";
        case "Đã hoàn thành":
          return "text-success";
        default:
          return "";
      }
    },
    getStatusIcon(status) {
      switch (status) {
        case "Đang chờ xử lý":
          return "bi bi-hourglass-split";
        case "Đang giao hàng":
          return "bi bi-truck";
        case "Đã hoàn thành":
          return "bi bi-check-circle";
        default:
          return "";
      }
    },
    filterOrders() {
      if (this.filterStatus === "") {
        this.filteredOrders = this.orders;
      } else {
        this.filteredOrders = this.orders.filter(
          (order) => order.status === this.filterStatus
        );
      }
    },
    viewOrderDetails(orderId) {
      this.selectedOrder = this.orders.find((order) => order.id === orderId);
      this.showOrderModal = true;
    },
    closeOrderModal() {
      this.showOrderModal = false;
      this.selectedOrder = {};
    },
    calculateTotal(items) {
      return items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
    updateOrderStatus(newStatus) {
      this.selectedOrder.status = newStatus;
      this.closeOrderModal();
      this.filterOrders();
    },
  },
};
</script>
<style scoped>
.order-page {
  padding: 20px;
}

.order-list ul {
  list-style-type: none;
  padding-left: 0;
}

.order-list .order-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
}

.order-list .order-info {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.order-list .status-indicator {
  cursor: pointer;
  transition: color 0.3s;
}

.order-list .status-indicator:hover {
  color: #0056b3; /* Màu xanh đậm khi hover */
}

.text-warning {
  color: #ffc107;
}

.text-info {
  color: #17a2b8;
}

.text-success {
  color: #28a745;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.modal-body {
  padding-bottom: 20px;
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.table-primary {
  background-color: #007bff;
  color: #fff;
}

.list-group-item-primary {
  background-color: #007bff;
  color: #fff;
}

.text-center button {
  margin: 5px;
}

.btn-primary,
.btn-info,
.btn-success {
  margin: 5px;
  color: #fff;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #007bff;
}

.btn-info {
  background: #17a2b8;
}

.btn-success {
  background: #28a745;
}
li {
  list-style: none;
}
</style>
