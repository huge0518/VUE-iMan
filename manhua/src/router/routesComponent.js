class RoutesComponent {

  registerComponent() {
    return import('../views/Register.vue')
  }

  loginComponent() {
    return import('../views/Login.vue')
  }
    
  indexComponent() {
    return import('../views/Index.vue')
  }

  homeComponent() {
    return import('../views/Home.vue')
  }

  classifyComponent() {
    return import('../views/Classify.vue')
  }

  searchComponent() {
    return import('../views/Search.vue')
  }

  mineComponent() {
    return import('../views/Mine.vue')
  }

  detailComponent(){
    return import('../views/Detail.vue')
  }

  manhuaComponent(){
    return import('../views/Manhua.vue')
  }

  listComponent(){
    return import('../views/List.vue')
  }
}
export default new RoutesComponent();
