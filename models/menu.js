//Tạo ra 1 prototype ứng với đối tượng back end yêu cầu
function MenuFood() {
    this.MaDanhMuc = '';
    this.TenDanhMuc = '';
    this.HinhAnh = '';
    this.DanhSachMonAn = [];
    this.themMonAn = function (maMonAn, tenMonAn, hinhAnh, gia) {
        var monAn = {
            "MaMonAn": maMonAn,
            "TenMonAn": tenMonAn,
            "HinhAnh": hinhAnh,
            "Gia": gia
        }
        this.DanhSachMonAn.push(monAn)
    }
}