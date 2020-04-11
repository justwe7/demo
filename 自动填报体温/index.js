const request = require('superagent')
const postMail = require('./postmail')

const baseURL = 'http://lyfy.bjchy.gov.cn'
const adminUuid = '3d468fa0-2173-43a2-8a12-1'

const mobile = '1'
const password = '1'

let TOKEN = 'cyfx-1.eyJzdWIiOiIxNzYwMDIwOTkzOSIsImV4cCI6MTU4Njk1MzYyOCwiaWF0IjoxNTg2MzQ4ODI4fQ.95wf8EezL1x3FNO2OdjP9njsRXYE2pX5iXUK1LmPqUlK3Ozb7AOHeLc8gjZODBagPCmIiwP35O0wlW59aimwFg'

const getForm = () => {
  return (
    request
      .get(`${baseURL}/h5/api/app/${adminUuid}/staff`)
      .set({
        Accept: 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        Authorization: TOKEN,
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Content-Type': 'application/json;charset=UTF-8',
        Host: 'lyfy.bjchy.gov.cn',
        Pragma: 'no-cache',
        Referer:
          `http://lyfy.bjchy.gov.cn/h5/${adminUuid}/input`,
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
      })
      .then((res) => {
        return res.body.data.staffInfo
      })
  )
}

const login = () => {
  return request
    .post(baseURL + '/h5/api/app/login')
    .send({ mobile, password })
    .set('Accept', 'application/json, text/plain, */*')
    .set('Accept-Encoding', 'gzip, deflate')
    .set('Accept-Language', 'zh-CN,zh;q=0.9')
    .set('Cache-Control', 'no-cache')
    .set('Connection', 'keep-alive')
    .set('Content-Type', 'application/json;charset=UTF-8')
    .set('Host', 'lyfy.bjchy.gov.cn')
    .set('Origin', 'http,//lyfy.bjchy.gov.cn')
    .set('Pragma', 'no-cache')
    .set('Referer', `http://lyfy.bjchy.gov.cn/h5/${adminUuid}/form`)
    .set('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1')
    .then((res) => {
      return res.body.data.jwtToken
    })
}

const submit = ({ data }) => {
  return (
    request
      .post(baseURL + '/h5/api/app/staff')
      .send(data)
      .set({
        Accept: 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        Authorization: TOKEN,
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Content-Type': 'application/json;charset=UTF-8',
        Host: 'lyfy.bjchy.gov.cn',
        Origin: 'http://lyfy.bjchy.gov.cn',
        Pragma: 'no-cache',
        Referer:
          `http://lyfy.bjchy.gov.cn/h5/${adminUuid}/input`,
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
      })
      .then((res) => {
        console.log(res.body)
        if (+res.body.code === 0) {
          return res.body
        }
        return Promise.reject(res)
      })
  )
}

const parseForm = data => {
  const { address } = data
  let [address1, address2] = address.split('&&')
  address1 = address1.split(',')
  Object.assign(data, {
    address1,
    address2,
    enterpriseUuid: adminUuid,
  })
  delete data.id
  delete data.fromWher
  delete data.departureTime
  delete data.returnTime
  delete data.wayBack
  delete data.wayBackDetail
  delete data.contactsWithPatientTime
  delete data.startIsolationTime
  delete data.endIsolationTime
  delete data.symptomDescription
  delete data.returnToBeijing

  data.bodyTemperature = `${35.5+Number(Math.random().toFixed(1))}`
}

;(async () => {
  let data
  const date = new Date()
  const dateStr = `${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

  try {
    const baseForm = await getForm()
    data = JSON.parse(JSON.stringify(baseForm))
  } catch (error) {
    try {
      TOKEN = `cyfx-${await login()}`
      const baseForm = await getForm()
      data = JSON.parse(JSON.stringify(baseForm))
    } catch (error) {
      postMail({
        subject: '登录失败 ❌',
        text: `卡在登录啦~~~，今天是：${dateStr}`
      })
    }
  }

  parseForm(data)
  // console.log(JSON.stringify(data))

  try {
    const msg = await submit({ data })
    postMail({
      subject: '体温填报 ✔',
      html: `<div><b>${dateStr}填报体温：${data.bodyTemperature}°</b></div>
      <div>公仆🧛‍♂️返回的信息：${JSON.stringify(msg)}</div>
      <div>P民🌾提交的信息：${JSON.stringify(data)}</div>`
      // text: `${dateStr}填报信息：${data.bodyTemperature}°。提交返回的信息：${JSON.stringify(msg)}`
    })
  } catch (error) {
    postMail({
      subject: '填报失败 ❌',
      text: `错误信息：${error}。今天是：${dateStr}`
    })
  }
})()



// fetch('http://lyfy.bjchy.gov.cn/h5/api/app/3d468fa0-2173-43a2-8a12-de949f149fa7/staff', {
//   headers: {
//     Authorization: 'cyfx-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNzYwMDIwOTkzOSIsImV4cCI6MTU4Njk1MzYyOCwiaWF0IjoxNTg2MzQ4ODI4fQ.95wf8EezL1x3FNO2OdjP9njsRXYE2pX5iXUK1LmPqUlK3Ozb7AOHeLc8gjZODBagPCmIiwP35O0wlW59aimwFg'
//   }
// }).then(function(response){
//     return response.text().then(function(text){
//       console.log(text)
//       return JSON.parse(text)
//     })
//   })

// fetch('http://lyfy.bjchy.gov.cn/h5/api/app/login', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8'
//   },
//   body: {
//     data: {
//       mobile: '17600209939',
//       password: '090077'
//     }
//   }
// }).then(function(response){
//     return response.text().then(function(text){
//       console.log(text)
//       return JSON.parse(text)
//     })
//   })