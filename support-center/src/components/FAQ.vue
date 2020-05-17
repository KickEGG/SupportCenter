<template>
  <main class="faq">
    <h1>Frenquently Asked Questions</h1>
    <Loading v-if="remoteDataLoading" />
    <div class="error" v-if="hasRemoteErrors">Can't load the questions</div>

    <section class="list">
      <article v-for="question of questionsList">
        <h2 v-html="question.title"></h2>
        <p v-html="question.content"></p>
      </article>
    </section>
  </main>
</template>

<script>
import RemoteData from "../mixins/RemoteData";

export default {
  mixins: [
    // console.log(this.$state),
    RemoteData({
      questionsList: "questions"
    })
  ]
  // data() {
  //   return {
  //     questions: [],
  //     error: null,
  //     loading: false
  //     //   remoteDataLoading: 42 这里会覆盖mixins中相同的数据定义
  //   };
  // },
  // created 钩子
  // async created() {
  //   // 加载过渡动画，loading时true，一切完成后设置为false
  //   this.loading = true;
  //   // try {
  //   //   const response = await fetch("http://localhost:3000/questions");
  //   //   if (response.ok) {
  //   //     this.questions = await response.json();
  //   //   } else {
  //   //     return new Eroor("error");
  //   //   }
  //   // } catch (e) {
  //   //   this.error = e;
  //   // }

  //   // 基于fetch插件重构
  //   // try {
  //   //   this.questions = await this.$fetch("questions");
  //   //   /**
  //   //    * 演示 将 this.questions的结果 存入localStorage，key='questionsJson'
  //   //    * localStorage是window上的。所以不需要写this.localStorage，vue中如果写this，是指vue实例
  //   //    */
  //   //   localStorage.setItem('questionsJson',JSON.stringify(this.questions));
  //   // } catch (e) {
  //   //   this.error = e;
  //   // }
  //   this.loading = false;
  // }
};
</script>