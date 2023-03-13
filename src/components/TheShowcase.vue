<template>
  <base-wrapper :class="'wrapper--dark'">
    <header class="header">
      <p class="title">Всі дизайни</p>
      <router-link to="/add">
        <base-btn>Додати дизайн</base-btn>
      </router-link>
    </header>
    <ul class="designs-list" @click="editDesign">
      <li
        v-for="design in designsBase"
        :key="design.id"
        :data-id="design.id"
        class="design"
      >
        <img
          class="design__img"
          :src="design.previewImgs[0].src"
          :alt="design.title + ' preview'"
        />
        <div class="design__desc">
          <p class="design__id">{{ design.id }}</p>
          <p class="design__title">{{ design.title }}</p>
        </div>
      </li>
    </ul>
    <p class="msg" v-if="designsBase.length == 0">
      Поки не завантажено жодного дизайну
    </p>
  </base-wrapper>
</template>

<script>
export default {
  inject: ["designsBase"],
  data() {
    return {};
  },
  methods: {
    editDesign(e) {
      if (!e.target.classList.contains("designs-list")) {
        let idi = e.target.closest(".design").dataset.id;
        this.$router.push("/add/" + idi);
      }
    },
  },
  created() {
    this.designsBase = this.designsBase.sort(function (a, b) {
      return a.id - b.id || a.id.localeCompare(b.id);
    });
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 30px;
}

.title {
  font-size: 24px;
  line-height: 40px;
  margin: 0;
  align-items: center;
  color: #ffffff;
}

.designs-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  list-style-type: none;
  max-width: 1324px;
  margin: 0 auto;
  padding: 0;
  gap: 1.33%;

  @media screen and (max-width: 767px) {
    justify-content: space-evenly;
  }
}

.design {
  cursor: pointer;
  display: inline-block;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
  width: 24%;
  aspect-ratio: 3/4;
  position: relative;

  &__img {
    align-self: flex-start;
    object-fit: cover;
    object-position: top;
    width: 100%;
    // max-height: 66%;
    height: 100%;
    margin-bottom: 10px;
    position: relative;
    transition: 0.3s ease;

    &:hover {
      transform: translate(0, -5px);
      box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.66);
    }
  }

  &__desc {
    display: flex;
    align-items: center;
    align-self: flex-end;
    background: #2c3d39;
    position: relative;
    width: 100%;
    overflow: hidden;

    &::after {
      border-right: 3px solid #2c3d39;
      content: "";
      background: linear-gradient(to left, #2c3d39 5%, transparent);
      display: inline-block;
      position: absolute;
      right: -1px;
      height: 100%;
      width: 50%;
    }
  }

  &__title {
    color: #fff;
    font-size: 16px;
    line-height: 18px;
    margin: 0 10px;
    white-space: nowrap;
  }

  &__id {
    align-items: center;
    background: #fff;
    border-radius: 8px;
    color: #000;
    display: flex;
    font-size: 11px;
    justify-content: center;
    line-height: 18px;
    text-align: center;
    margin: 0;
    padding: 0 5px;
    min-width: 33px;
  }

  @media screen and (max-width: 767px) {
    min-width: 150px;
    flex-grow: 1;
  }
}

.msg {
  margin-top: 40px;
  color: #fff;
  text-align: center;
  pointer-events: none;
}
</style>