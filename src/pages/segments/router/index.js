import Vue from 'vue'
import Router from 'vue-router'
import AddSegments from '../components/addSegments'
import EditSegments from '../components/editSegments'
import SegmentsList from '../components/segmentsList'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/segments',
            component: AddSegments
        },
        {
            path: '/segments/add',
            name:'add',
            component: AddSegments
        },
        {
            path: '/segments/edit/:id',
            name:'edit',
            component: EditSegments
        },
        {
            path: '/segments/list',
            name:'list',
            component: SegmentsList
        }
    ]
})
