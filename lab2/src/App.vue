<template>
  <div>
    <AppHeader/>

    <div class="d-flex justify-content-around align-items-center">
      
        <AppSidebar v-if="currentView === 'home'" />
  
        <div class="content">
          <DataList
            v-if="currentView === 'home'"
            :students="students"
            @add-data="goToForm"
          />

        <DataForm
          v-if="currentView === 'form'"
          :formData="formData"
          @next-step="goToPreview"
          class="flex-fill"
        />

        <Datacard
          v-if="currentView === 'preview'"
          :formData="formData"
          @prev-step="goToForm"
          @submit-data="submitData"
        />
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppFooter from './components/Footer.vue'
import AppSidebar from './components/Sidbar.vue'
import DataList from './components/DataList.vue'
import DataForm from './components/DataForm.vue'
import Datacard from './components/Datacard.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AppSidebar,
    DataList,
    DataForm,
    Datacard,
  },
  data() {
    return {
      currentView: 'home',
      students: [
        { id: 100, title: 'shaker', content: 'Student', category: 'Testing', series: 'First Edition', shareImmediately: false, shareOn: ['Facebook'] },
        { id: 200, title: 'abdo', content: 'Student', category: 'Developing', series: 'Second Edition', shareImmediately: true, shareOn: ['Twitter'] }
      ],
      formData: {
        title: '',
        content: '',
        category: '',
        series: '',
        shareOn: [],
        shareImmediately: false
      }
    }
  },
  methods: {
    goToForm() {
      this.currentView = 'form'
    },
    goToPreview(data) {
      this.formData = { ...data }
      this.currentView = 'preview'
    },
    submitData() {
      const lastStudent = this.students[this.students.length - 1]
      const newId = lastStudent ? lastStudent.id + 100 : 100

      this.students.push({
        id: newId,
        ...this.formData
      })

      this.formData = {
        title: '',
        content: '',
        category: '',
        series: '',
        shareOn: [],
        shareImmediately: false
      }

      this.currentView = 'home'
    }
  }
}
</script>