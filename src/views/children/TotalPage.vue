<template>
  <div class="course-page">
    <!-- 分类导航栏 -->
    <div class="category-nav">
      <div class="category-item" :class="{ active: activeCategory === '全部' }" @click="changeCategory('全部')">
        全部
      </div>
      <div class="category-item" v-for="(category, index) in categories" :key="index"
        :class="{ active: activeCategory === category.id }" @click="changeCategory(category.id)">
        {{ category.name }}
      </div>
    </div>

    <!-- 搜索框 -->
    <div class="search-container">
      <el-input v-model="searchKeyword" placeholder="请输入您想要了解的课程" prefix-icon="el-icon-search" clearable
        @keyup.enter.native="searchCourses"></el-input>
    </div>

    <!-- 课程列表 -->
    <div class="course-list">
      <div v-if="displayedCourses.length === 0">
        <p>没有符合条件的课程哦</p>
      </div>
      <div class="course-card" v-for="course in displayedCourses" :key="course.id" @click="toDetail(course.id)">
        <img :src="course.cover_image" class="course-image" alt="课程封面">
        <div class="course-info">
          <h3 class="course-title">{{ course.description }}</h3>
          <p class="course-description">{{ truncate(course.title, 5) }}</p>
          <p class="course-instructor">授课老师：{{ course.instructor }}</p>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination v-model="currentPage" :page-size="pageSize" :total="filteredCourses.length"
        layout="prev, pager, next" @current-change="handlePageChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';
export default {
  data() {
    return {
      activeCategory: '全部',
      searchKeyword: '',
      categories: [],
      courses: [],
      pageSize: 8, // 每页显示的课程数量
      currentPage: 1, // 当前页码
    };
  },
  async mounted() {
    // 加载所有课程
    const courseRes = await axios.get(`http://localhost:3000/course/courselist`);
    this.courses = courseRes.data.data;
    // 加载所有分类
    const categoryRes = await axios.get(`http://localhost:3000/category/categories`);
    this.categories = categoryRes.data.data;
    console.log(categoryRes.data)
  },
  computed: {
    // 过滤展示相应分类的课程
    filteredCourses() {
      if (this.activeCategory === '全部') {
        return this.courses;
      } else {
        return this.courses.filter(course => course.category_id === this.activeCategory);
      }
    },
    // 总页码
    totalPages() {
      return Math.ceil(this.filteredCourses.length / this.pageSize);
    },
    // 展示当前页显示的课程
    displayedCourses() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      // 返回截取的页码的长度，slice就是截取末地址-首地址（不包含首地址）
      return this.filteredCourses.slice(startIndex, endIndex);
    },
  },
  methods: {
    // 截取5行
    truncate(text, lines) {
      const words = text.split(' ');
      if (words.length <= lines) {
        return text;
      } else {
        return words.slice(0, lines).join(' ') + '...';
      }
    },
    changeCategory(categoryId) {
      this.activeCategory = categoryId;
      this.currentPage = 1;
    },
    // 关键字查询  
    async searchCourses() {
      const keyRes = await axios.get(`http://localhost:3000/course/coursesearch`, {
        params: {
          keyword: this.searchKeyword,
        },
      })
      console.log(keyRes.data.data)
      this.courses = keyRes.data.data
      this.currentPage = 1;
      // console.log(111)
    },
    // 将当前页码作为参数传递
    handlePageChange(currentPage) {
      this.currentPage = currentPage;
    },
    toDetail(id) {
      router.push({
        path: '/home/coursedetail',
        query: {
          courseId: id
        }
      });
    }
  },
};
</script>

<style scoped>
.course-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.category-nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.category-item {
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.category-item.active {
  background-color: #fa2;
  color: white;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.course-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.course-card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  cursor: pointer;
}

.course-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.course-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.course-info {
  padding: 20px;
}

.course-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.course-description {
  margin-bottom: 10px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  /* 行数限制 */
  -webkit-box-orient: vertical;
  line-height: 2;
}

.course-instructor {
  color: #999;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
