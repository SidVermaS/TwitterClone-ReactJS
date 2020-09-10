import React from 'react'

class APICalls  {
    constructor({ profile })  {
        this.headers={
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'authorization': profile===undefined || profile===null?null:profile.authorization
        }
    }
    headers
    baseUrl='http://localhost:5000/'
    baseUrlTweetPhoto='http://localhost:5000/uploads/tweets/'
    baseUrlProfilePhoto='http://localhost:5000/uploads/profiles/'
    baseUrlListPhoto='http://localhost:5000/uploads/lists/'
    login='login/' 
    register='register/'
    tweet='tweet/'
    profileUrl='profile/'
    favorite='favorite/'
    list='list/'
    pinned='pinned/'
    upload='upload/'

   
    postRequest(url, formData)  {
        return new Promise((resolve)=>  {
            const options={
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(formData)
            }
            fetch(`${this.baseUrl}${url}`, options)
                .then(response=>{
                    response.json().then(jsonData=>{
                        resolve({ status: response.status, body: jsonData })
                }).catch(err=>  {
                    resolve(err)
                })
            })
        })    
    } 
    getRequest(url) {
        return new Promise((resolve)=>  {
            const options={
                method: 'GET',
                headers: this.headers,
            }
            fetch(`${this.baseUrl}${url}`, options)
                .then(response=>    {
                    response.json().then(jsonData=>    {
                        resolve({ status: response.status, body: jsonData })
                }).catch(err=>  {
                    resolve(err)
                })
            })
        })    
    }
    patchRequest(url, formData)   {
        return new Promise((resolve)=>  {
            const options={
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(formData)                
            }
            fetch(`${this.baseUrl}${url}`, options).then(response=>    {
                response.json().then(jsonData=> {
                    resolve({ status: response.status, body: jsonData })
                })
                .catch(err=>    {
                    return resolve(err)
                })
            })
        })    
    }
    postFormDataRequest=(url, formData)=>   {
        return new Promise((resolve)=>  {
            const options={
                method: 'POST',
                // headers: { 'Content-Type': 'multipart/form-data' },                
                body: formData               
            }
            fetch(`${this.baseUrl}${url}`, options).then(response=>    {
                response.json().then(jsonData=> {
                    resolve({ status: response.status, body: jsonData })
                })
                .catch(err=>    {
                    return resolve(err)
                })
            })
        })    
    }
}

export default APICalls

