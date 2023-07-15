<template>
    <div class="course-page">
      <!-- 分类导航栏 -->
      <div class="category-nav">
        <div
          class="category-item"
          v-for="(category, index) in categories"
          :key="index"
          :class="{ active: activeCategory === category }"
          @click="changeCategory(category)"
        >
          {{ category }}
        </div>
      </div>
  
      <!-- 搜索框 -->
      <div class="search-container">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入搜索关键词"
          prefix-icon="el-icon-search"
          clearable
          @clear="searchCourses"
        ></el-input>
      </div>
  
      <!-- 课程列表 -->
      <div class="course-list">
        <div class="course-card" v-for="course in displayedCourses" :key="course.id">
          <img :src="course.image" class="course-image" alt="课程封面">
          <div class="course-info">
            <h3 class="course-title">{{ course.title }}</h3>
            <p class="course-description">{{ course.description }}</p>
            <p class="course-instructor">授课老师：{{ course.instructor }}</p>
          </div>
        </div>
      </div>
  
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model="currentPage"
          :page-size="pageSize"
          :total="courses.length"
          layout="prev, pager, next"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeCategory: '全部',
        searchKeyword: '',
        categories: ['全部', '编程', '设计', '语言'],
        courses: [
          { id: 1, title: '课程1', description: '课程1的描述', instructor: '张三', image: 'course1.jpg' },
          { id: 2, title: '课程2', description: '课程2的描述', instructor: '李四', image: 'course2.jpg' },
          { id: 3, title: '课程3', description: '课程3的描述', instructor: '王五', image: 'course3.jpg' },
          { id: 4, title: '课程4', description: '课程4的描述', instructor: '赵六', image: 'course4.jpg' },
          { id: 5, title: '课程5', description: '课程5的描述', instructor: '钱七', image: 'course5.jpg' },
          { id: 6, title: '课程6', description: '课程6的描述', instructor: '孙八', image: 'course6.jpg' },
          { id: 7, title: '课程7', description: '课程7的描述', instructor: '周九', image: 'course7.jpg' },
          { id: 8, title: '课程8', description: '课程8的描述', instructor: '吴十', image: 'course8.jpg' },
          { id: 9, title: '课程9', description: '课程9的描述', instructor: '郑十一', image: 'course9.jpg' },
          { id: 10, title: '课程10', description: '课程10的描述', instructor: '黄十二', image: 'course10.jpg' },
          // 更多课程...
        ],
        pageSize: 8, // 每页显示的课程数量
        currentPage: 1, // 当前页码
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.displayedCourses.length / this.pageSize);
      },
      displayedCourses() {
        const filteredCourses = this.filterCoursesByCategory(this.courses);
        const searchedCourses = this.searchCoursesByKeyword(filteredCourses);
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return searchedCourses.slice(startIndex, endIndex);
      },
    },
    methods: {
      filterCoursesByCategory(courses) {
        if (this.activeCategory === '全部') {
          return courses;
        } else {
          return courses.filter(course => course.category === this.activeCategory);
        }
      },
      searchCoursesByKeyword(courses) {
        if (this.searchKeyword === '') {
          return courses;
        } else {
          const keyword = this.searchKeyword.toLowerCase();
          return courses.filter(
            course =>
              course.title.toLowerCase().includes(keyword) ||
              course.description.toLowerCase().includes(keyword) ||
              course.instructor.toLowerCase().includes(keyword)
          );
        }
      },
      changeCategory(category) {
        this.activeCategory = category;
        this.currentPage = 1;
      },
      searchCourses() {
        this.currentPage = 1;
      },
      handlePageChange(currentPage) {
        this.currentPage = currentPage;
      },
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
    background-color: #f0f0f0;
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
  