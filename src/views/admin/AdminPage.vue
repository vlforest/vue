<template>
  <div class="container-fluid admin-page-container">
    <div class="row">
      <div class="col-12">
        <admin-header />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3">
        <admin-sidebar />
      </div>
      <div class="col-lg-9 main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from '@/components/admin/AdminHeader.vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';

export default {
  name: 'AdminPage',
  components: {
    AdminHeader,
    AdminSidebar
  }
};
</script>

<style scoped>
.main-content {
  padding: 20px;
}
</style>
