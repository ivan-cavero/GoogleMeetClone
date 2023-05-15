<template>
  <div>
    <div class="carousel">
      <button class="left-arrow" @click="previous">
        <font-awesome-icon :icon="'fa-chevron-left'" />
      </button>
      <div class="carousel-item-container">
        <div class="carousel-item" v-for="(item, index) in items" :key="index"
          :class="{ active: index === currentIndex }">
          <div class="carousel-content">
            <div class="carousel-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="carousel-info">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <button class="right-arrow" @click="next">
        <font-awesome-icon :icon="'fa-chevron-right'" />
      </button>
    </div>
    <div class="carousel-points">
      <span
        class="carousel-point"
        v-for="(item, index) in items"
        :key="index"
        :style="{ backgroundColor: index === currentIndex ? 'rgb(98, 177, 255)' : 'gray' }"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      currentIndex: 0,
      items: [
        {
          image: 'https://www.gstatic.com/meet/meet_google_one_carousel_promo_icon_0f14bf8fc61484b019827c071ed8111d.svg',
          title: 'Access premium Meet features',
          description: 'Enjoy longer group video calls, noise cancellation, and more benefits with a Premium Google One plan.'
        },
        {
          image: 'https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg',
          title: 'Get a shareable link',
          description: 'Tap New Meeting to generate a link that you can share with the people you want to meet with.'
        }
      ]
    }
  },
  methods: {
    previous () {
      if (this.currentIndex === 0) {
        this.currentIndex = this.items.length - 1
      } else {
        this.currentIndex--
      }
    },
    next () {
      if (this.currentIndex === this.items.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
    },
    onBeforeChange (newIndex) {
      if (this.currentIndex !== newIndex) {
        this.currentIndex = newIndex
      }
    }
  }
}
</script>

<style scoped>
.carousel {
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 auto;
}

.carousel-item-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 300px;
  height: 300px;
}

.carousel-item {
  display: none;
  flex-shrink: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.carousel-item.active {
  display: block;
  opacity: 1;
}

.carousel-item img {
  border-radius: 50%;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.carousel-info {
  text-align: center;
  margin-top: 1rem;
}

.carousel-item:nth-child(1) {
  display: block;
}

.carousel-points {
  position: relative;
  top: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-point {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin: 0 3px;
}
.carousel button {
  margin: 1rem;
  background-color: white;
  border: none;
  cursor: pointer;
}
.left-arrow,
.right-arrow {
  transition: transform 0.3s ease;
}

.left-arrow:hover {
  transform: translateX(-5px);
}

.right-arrow:hover {
  transform: translateX(5px);
}

</style>
