<template>
  <footer class="footer">
    <div class="container">
      <hr class="footer-separator" />
      <div class="card footer-card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-3 mb-3">
              <div class="branch-info">
                <h5>{{ $t("footer.headOffice") }}</h5>
                <p>{{ $t("footer.headOfficeName") }}</p>
                <p>{{ $t("footer.headOfficeAddress") }}</p>
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <div class="branch-info">
                <h5>{{ $t("footer.northBranch") }}</h5>
                <p>{{ $t("footer.northBranchName") }}</p>
                <p>{{ $t("footer.northBranchAddress") }}</p>
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <div class="branch-info">
                <h5>{{ $t("footer.centralBranch") }}</h5>
                <p>{{ $t("footer.centralBranchName") }}</p>
                <p>{{ $t("footer.centralBranchAddress") }}</p>
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <div class="branch-info">
                <h5>{{ $t("footer.equipmentSupply") }}</h5>
                <p>{{ $t("footer.equipmentSupplyName") }}</p>
                <p>{{ $t("footer.equipmentSupplyAddress") }}</p>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-6 mb-3">
              <div class="contact-info">
                <h5>{{ $t("footer.contactTitle") }}</h5>
                <p>{{ $t("footer.sandpaper") }}</p>
                <p>{{ $t("footer.machinery") }}</p>
              </div>
            </div>
            <div class="col-md-6 mb-3 text-end">
              <p>
                &copy; 2025 RIKEN VIETNAM CO., LTD.<br />Developed by Lâm Vũ
                Linh
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterUser",
};
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 20px 0;
}
.footer-separator {
  border-top: 2px solid #1ed76d; /* Đường phân cách */
  margin-bottom: 20px;
}
.footer-card {
  background: linear-gradient(
    135deg,
    #1ed76d 0%,
    #1e6d4f 100%
  ); /* Màu chuyển tiếp bóng nổi */
  border: 1px solid #1e6d4f; /* Viền cho thẻ */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Hiệu ứng bóng */
  color: #ffffff; /* Màu chữ trắng */
}
.card-body {
  font-size: 0.9rem;
}
.branch-info {
  margin-bottom: 15px;
}
.branch-info h5 {
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: #ffc107; /* Màu nổi bật cho tiêu đề */
}
.contact-info h5 {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #ffc107; /* Màu nổi bật cho tiêu đề */
}
</style>
