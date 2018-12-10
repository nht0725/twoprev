var pagenum = 1;
var num = 4;

function getUserlist() {
    $.ajax({
        url: '/users',
        data: {
            pagenum: pagenum,
            num: num
        },
        success: function(data) {
            console.log(data);
            // if (data.code == 1) {
            //     render(data.data);
            // }
            if (data.code == 1 && data.total <= pagenum) {
                pagenum++;
                render(data.data);
            }
        }
    })
}
getUserlist();


function render(data) {
    var str = '';
    var baseUrl = 'http://localhost:3000/images/';
    data.forEach(function(file) {
        str += `<dl>
                <dt><img src="${baseUrl}${file.url}" alt=""></dt>
                <dd>
                    <p>${file.description}</p>
                    <p><span>${file.name}</span><span>💗2W+</span></p>
                </dd>
            </dl>`
    });
    con.innerHTML += str;
    var BS = new BScroll('#content', {
        probeType: 2
    });
    BS.on('scroll', function() {
        if (this.y > this.maxScrollY - 30) {
            // render(data);
            //     con.innerHTML += `<dl>
            //     <dt><img src="${baseUrl}1.png" alt=""></dt>
            //     <dd>
            //         <p>大家骄傲的是卡</p>
            //         <p><span>赵丽颖</span><span>💗2W+</span></p>
            //     </dd>
            // </dl>`;
            getUserlist();
        }
    });
    // BS.on('scrollEnd', function() {
    //     BS.refresh();
    // })
}