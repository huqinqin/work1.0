# my-vue-test

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### Nginx virtual host config
```
server {
    listen       8085;
    server_name  work.lts.com;
    root         /home/wwwroot/lts-work;
    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    # 开发时代理到开发服务器，生产环境删除该配置
    # this config for proxy to development server, remove on production
    location / {
        proxy_pass http://127.0.0.1:8080;
        index /pages/index.html;
    }

    # 后端服务转发
    # proxy to backend server
    location ~ /gateway/ {
        proxy_pass http://api.lts.com:8081;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    error_page 404 /404.html;
        location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }
}
```
