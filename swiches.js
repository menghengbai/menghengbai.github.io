console.log("点击频率排序模块已挂载" + Date())
let divs = {}
document.querySelectorAll("div").forEach((v, k) => {
    divs[v.id] = 0
})
Object.assign(divs, JSON.parse(localStorage.getItem("divs")))
if (localStorage.getItem("onsort")) {
    let divr = []
    let ids = 0
    for (i in divs) {
        let temps = {}
        temps.id = i
        temps.ct = divs[i]
        divr[ids] = temps
        ids++
    }
    divr.sort((a, b) => {
        return b.ct - a.ct
    })
    for (let i = 0; i < ids; i++) {
        let p = document.createElement('div')
        p = document.querySelector(`#${divr[i].id}`)
        document.querySelector("#main").removeChild(document.querySelector(`#${divr[i].id}`))
        document.querySelector("#main").appendChild(p)
    }
}
if(localStorage.getItem("onsort") == 'true') document.querySelector("input").checked = true
document.querySelector("input").onclick = (e)=>{
    localStorage.setItem("onsort", e.target.checked)
}
document.querySelectorAll("a").forEach((v, k) => {
    v.onclick = (e) => {
        divs[e.target.parentNode.id] += 1
        localStorage.setItem("divs", JSON.stringify(divs))
    }
})
console.log("点击频率排序工作完成" + Date())