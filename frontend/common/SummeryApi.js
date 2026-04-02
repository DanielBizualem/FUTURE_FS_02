export const baseURL = "http://localhost:4000"

const summeryApi = {
    login:{
        url:"/admin/login",
        method:"post"
    },
    addLead:{
        url:"/admin/addLeads",
        method:"post"
    },
    leadsDetail:{
        url:"/admin/leadsDetail",
        method:"get"
    }
}

export default summeryApi