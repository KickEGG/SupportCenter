<template>
  <div class="ticket">
    <h2>Ticket</h2>
    <Loading v-if="remoteDataBusy" />
    <div class="empty" v-else-if="!ticket">Ticket not found</div>
    <template v-else>
      <section class="infos">
        <div class="info">
          Create on
          <strong>{{ticket.date | date}}</strong>
        </div>
        <div class="info">
          Author
          <strong>{{ticket.user.username}}</strong>
        </div>
        <div class="info">
          Status
          <span class="badge">{{ticket.status}}</span>
        </div>
      </section>
      <!-- Content -->
      <section class="content">
        <h3>{{ticket.title}}</h3>
        <p>{{ticket.description}}</p>
      </section>
    </template>
  </div>
</template>

<script>
import RemoteData from "../mixins/RemoteData";

export default {
  // 从服务器获取工单详情的工单id
  props: {
    id: {
      type: String,
      required: true
    }
  },
  // 动态路由，通过id prop加载工单数据
  mixins: [
    RemoteData({
      ticket() {
        return `ticket/${this.id}`;
      }
    })
  ]
};
</script>

<style>
</style>