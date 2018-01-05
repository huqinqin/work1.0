import Vue from 'vue'
import Router from 'vue-router'
import AddSegments from '../components/addSegments'
import EditSegments from '../components/editSegments'
import SegmentsList from '../components/segmentsList'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: AddSegments
        },
        {
            path: '/add',
            component: AddSegments
        },
        {
            path: '/edit/:id',
            component: EditSegments
        },
        {
            path: '/list',
            component: SegmentsList
        }
    ]
})
