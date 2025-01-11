<template>
  <div class="contact-page container-fluid">
    <h1>{{ $t("contact.title") }}</h1>

    <div class="contact-section">
      <h2>{{ $t("contact.headOfficeTitle") }}</h2>
      <p>{{ $t("contact.headOfficeName") }}</p>
      <p>{{ $t("contact.headOfficeAddress") }}</p>
    </div>

    <div class="contact-section">
      <h2>{{ $t("contact.northBranchTitle") }}</h2>
      <p>{{ $t("contact.northBranchName") }}</p>
      <p>{{ $t("contact.northBranchAddress") }}</p>
    </div>

    <div class="contact-section">
      <h2>{{ $t("contact.centralBranchTitle") }}</h2>
      <p>{{ $t("contact.centralBranchName") }}</p>
      <p>{{ $t("contact.centralBranchAddress") }}</p>
    </div>

    <div class="contact-section">
      <h2>{{ $t("contact.equipmentSupplyTitle") }}</h2>
      <p>{{ $t("contact.equipmentSupplyName") }}</p>
      <p>{{ $t("contact.equipmentSupplyAddress") }}</p>
    </div>

    <div class="contact-section">
      <h2>{{ $t("contact.phoneTitle") }}</h2>
      <div class="contact-details">
        <p>{{ $t("contact.sandpaper") }}</p>
        <p>{{ $t("contact.sandpaperContact1") }}</p>
        <p>{{ $t("contact.sandpaperContact2") }}</p>
        <p>{{ $t("contact.machinery") }}</p>
        <p>{{ $t("contact.machineryContact1") }}</p>
        <p>{{ $t("contact.machineryContact2") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactPage",
};
</script>

<style scoped>
.container-fluid {
  max-width: 1200px;
  margin: 0px auto;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
h1,
h2 {
  color: #1e6d4f;
}
h2 {
  border-bottom: 2px solid #1ed76d;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
.contact-section {
  margin-bottom: 20px;
}
.contact-section p {
  margin: 5px 0;
}
.contact-details {
  border: 1px solid #1ed76d;
  padding: 10px;
  border-radius: 4px;
}
.contact-details p {
  margin: 5px 0;
}
</style>
