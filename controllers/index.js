var mangMenu = []
function LoadMenu() {
  //Gọi axios lấy dữ liệu từ api về
  var promise = axios({
    url: 'http://svcy.myclass.vn/api/QuanLyMenu/LayDanhSachMenu',
    method: 'GET',
    responseType: 'json'
  });
  promise.then(renderMenu).catch(function (err) {

  });
}

//callback function được gọi trong hàm thenn từ promise sau khi gọi api
function renderMenu(result) {
  console.log(result.data);
  //render data từ api trả về ra giao diện
  mangMenu = result.data;
  var contentMenu = '';
  for (var i = 0; i < mangMenu.length; i++) {
    var menu = mangMenu[i];
    console.log(menu);
    contentMenu += `
        <div class="row">
        <div class="col-md-12">
          <h3>${menu.TenDanhMuc} <i class="edit" data-toggle="modal" data-target="#modelId" onclick="suaMenu('${i}')">sửa</i> <i class="delete" onclick="xoaMenu('${menu.MaDanhMuc}')">xóa</i></h3>
          <div class="row">
            ${renderMenuItem(menu.DanhSachMonAn)}
          </div>
        </div>
      </div>
        `
  }

  document.getElementById('content-menu').innerHTML = contentMenu;
};

//định nghĩa hàm xóa menu
function xoaMenu(maDanhMuc) {
  var promise = axios({
    url: 'http://svcy.myclass.vn/api/QuanLyMenu/Delete?maDanhMuc=' + maDanhMuc,
    method: 'DELETE',
    responseType: 'json'
  });
  promise.then(function (result) {
    console.log(result);
    LoadMenu();
  }).catch(function (err) {
    console.log(err.response.data);
  });
}

function suaMenu(index) {
  var menuChinhSua = mangMenu[index];

  document.getElementById("MaDanhMuc").value = menuChinhSua.MaDanhMuc;
  document.getElementById("TenDanhMuc").value = menuChinhSua.TenDanhMuc;
  document.getElementById("HinhAnh").value = menuChinhSua.HinhAnh;
  suaMenuItem(menuChinhSua.DanhSachMonAn);
}

function suaMenuItem(mangDanhSachMonAn) {
  console.log(mangDanhSachMonAn);
  //duyệt thuộc tính mảng món ăn của menu
  for (var i = 0; i < mangDanhSachMonAn.length; i++) {
    var monAn = mangDanhSachMonAn[i];
    document.querySelector('.maMonAn').value = monAn.MaMonAn;
    document.querySelector('.tenMonAn').value = monAn.TenMonAn;
    document.querySelector('.gia').value = monAn.Gia;
    document.querySelector('.hinhAnh').value = monAn.HinhAnh;
  }
}

function renderMenuItem(mangDanhSachMonAn) {
  console.log(mangDanhSachMonAn);
  var contentMenuItem = '';
  //duyệt thuộc tính mảng món ăn của menu
  for (var i = 0; i < mangDanhSachMonAn.length; i++) {
    var monAn = mangDanhSachMonAn[i];
    contentMenuItem += ` 
        <div class="col-6">
              <p>${monAn.TenMonAn}</p>
            </div>
            <div class="col-2"><img src="${monAn.HinhAnh}" width="35" height="35" /></div>
            <div class="col-4">
              <p>${monAn.Gia}</p>
            </div>
        `
  }

  return contentMenuItem;
}

document.getElementById("btnThemMenu").onclick = function () {
  //lấy thông tin người dùng nhập vào
  var menuDataPost = new MenuFood();
  menuDataPost.MaDanhMuc = document.getElementById("MaDanhMuc").value;
  menuDataPost.TenDanhMuc = document.getElementById("TenDanhMuc").value;
  menuDataPost.HinhAnh = document.getElementById("HinhAnh").value;
  //thêm dữ liệu vào thuộc tính DanhSachMonAn
  //b1: duyệt các div mon-an
  var arrDivMonAn = document.querySelectorAll('.mon-an');
  for (var i = 0; i < arrDivMonAn.length; i++) {
    var tagMonAn = arrDivMonAn[i];
    //từ tag món ăn lấy các input món ăn thêm vào mảng
    var maMonAn = tagMonAn.querySelector('.maMonAn').value;
    var tenMonAn = tagMonAn.querySelector('.tenMonAn').value;
    var gia = tagMonAn.querySelector('.gia').value;
    var hinhAnh = tagMonAn.querySelector('.hinhAnh').value;
    //thêm vào mảng menuDataPost.DanhSachMonAn thông quan phương thức themMonAn
    menuDataPost.themMonAn(maMonAn, tenMonAn, hinhAnh, gia);
  }

  //gọi api bkacend
  var promise = axios({
    url: 'http://svcy.myclass.vn/api/QuanLyMenu/TaoMenu',
    method: 'POST',
    data: menuDataPost,
    responseType: 'json'
  });
  promise.then(function (result) {
    console.log(result);
    //lưu thành công thì load lại trang đồng thời lấy dât mới từ api về thông qua hàm LoadMenu
    location.reload();
    //cách 2: gọi hàm load lại menu không cần lại cả trang
    // LoadMenu();
  }).catch(function (err) {
    alert(err.response.data);
  });
}

document.getElementById("btnSuaMenu").onclick = function () {
  //lấy thông tin người dùng nhập vào
  var menuDataPostUpdate = new MenuFood();
  menuDataPostUpdate.MaDanhMuc = document.getElementById("MaDanhMuc").value;
  menuDataPostUpdate.TenDanhMuc = document.getElementById("TenDanhMuc").value;
  menuDataPostUpdate.HinhAnh = document.getElementById("HinhAnh").value;
  //thêm dữ liệu vào thuộc tính DanhSachMonAn
  //b1: duyệt các div mon-an
  var arrDivMonAnUpdate = document.querySelectorAll('.mon-an');
  for (var i = 0; i < arrDivMonAnUpdate.length; i++) {
    var tagMonAnUpdate = arrDivMonAnUpdate[i];
    //từ tag món ăn lấy các input món ăn thêm vào mảng
    var maMonAnUpdate = tagMonAnUpdate.querySelector('.maMonAn').value;
    var tenMonAnUpdate = tagMonAnUpdate.querySelector('.tenMonAn').value;
    var giaUpdate = tagMonAnUpdate.querySelector('.gia').value;
    var hinhAnhUpdate = tagMonAnUpdate.querySelector('.hinhAnh').value;
    //thêm vào mảng menuDataPost.DanhSachMonAn thông quan phương thức themMonAn
    menuDataPostUpdate.themMonAn(maMonAnUpdate, tenMonAnUpdate, hinhAnhUpdate, giaUpdate);
  }

  //gọi api bkacend
  var promise = axios({
    url: 'http://svcy.myclass.vn/api/QuanLyMenu/CapNhatMenu',
    method: 'PUT',
    data: menuDataPostUpdate,
    responseType: 'json'
  });
  promise.then(function (result) {
    console.log(result);
    //lưu thành công thì load lại trang đồng thời lấy dât mới từ api về thông qua hàm LoadMenu
    location.reload();
    //cách 2: gọi hàm load lại menu không cần lại cả trang
    // LoadMenu();
  }).catch(function (err) {
    alert(err.response.data);
  });
}


//định nghĩa sự kiện click cho nút thêm món
document.getElementById("btnThemMon").onclick = function () {
  //tạo ra ndung các row chứa input thông tin
  var divMonAn = `  
    <div class="mon-an">
    <div class="form-group row">
      <div class="col-6 mt-2">
        <input class="form-control maMonAn" placeholder="Mã món" />
      </div>
      <div class="col-6 mt-2">
        <input class="form-control tenMonAn"  placeholder="Tên món" />
      </div>
      <div class="col-6 mt-2">
        <input class="form-control gia" placeholder="Giá món" />
      </div>
      <div class="col-6 mt-2">
        <input class="form-control hinhAnh" placeholder="Link hình" />
      </div>
    </div>
    <div class="text-right"><button class="btnXoaMon btn-danger">Xóa</button></div>
  </div>
    `
  //dom đến div danh-sach-mon-an
  document.querySelector('.danh-sach-mon-an').innerHTML += divMonAn;
  //gọi hàm định nghĩa sự kiện lại cho các nút xóa
  createEventBtnXoa();
}

function createEventBtnXoa() {
  //duyệt tất cả nút xóa => trả ra mảng button xóa
  var arrBtnXoaMon = document.querySelectorAll('.btnXoaMon');
  for (var i = 0; i < arrBtnXoaMon.length; i++) {
    var btnXoa = arrBtnXoaMon[i];
    //định nghĩa sự kiện xóa cho từng button
    btnXoa.onclick = function () {
      //xử lý sự kiện nút xóa để xóa div mon-an
      //this là nút đang được định nghĩa sự kiên onclick
      this.closest('.mon-an').remove();
    }
  }

}

LoadMenu();