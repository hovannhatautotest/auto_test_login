/// <reference types="cypress" />
describe('Verify validation text', () => {
  beforeEach(()=>{
	  cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
  })
    
  it('Không nhập tên đăng nhập', () => {
    cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
    cy.get('#password').type('text_pass')
    cy.wait(2000)
    cy.get('#submit-btn').click()
    cy.wait(2000)
    cy.get(':nth-child(1) > .ant-row > .ant-form-item-control > .ant-form-item-explain > .ant-form-item-explain-error')
    .contains('This is a required field!')
    cy.wait(2000)
  })
    
  it('Không nhập password', () => {
    cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
    cy.get('#email').type('text_user@gmail.com')
    cy.wait(2000)
    cy.get('#submit-btn').click()
    cy.wait(2000)
    cy.get(':nth-child(2) > .ant-row > .ant-form-item-control > .ant-form-item-explain > .ant-form-item-explain-error')
    .contains('This is a required field!')
    cy.wait(2000)
  })
    
  it('Không nhập cả tên đăng nhập và mật khẩu', () => {
    cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
    cy.get('#submit-btn').click()
    cy.wait(2000)
    cy.get(':nth-child(1) > .ant-row > .ant-form-item-control > .ant-form-item-explain > .ant-form-item-explain-error').contains('This is a required field!')
    cy.get(':nth-child(2) > .ant-row > .ant-form-item-control > .ant-form-item-explain > .ant-form-item-explain-error').contains('This is a required field!')
    cy.wait(2000)
  })

  it('Nhập sai định dạng tên đăng nhập', () => {
    cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
    cy.get('#email').type('text_user')
    cy.wait(2000)
    cy.get('#password').type('text_pass')
    cy.wait(2000)
    cy.get('#submit-btn').click()
    cy.wait(2000)
    cy.get(':nth-child(1) > .ant-row > .ant-form-item-control > .ant-form-item-explain > .ant-form-item-explain-error').contains('Please enter a valid email address!')
    cy.wait(2000)
  })
})

describe('Verify error message', () => {
  beforeEach(()=>{
    cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
  })
  
  it('Sai tên đăng nhập nhưng đúng mật khẩu', () => {
    cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
    cy.get('#email').type('text_user@gmail.com')
    cy.wait(2000)
    cy.get('#password').type('Ari123456#')
    cy.wait(2000)
    cy.get('#submit-btn').click()
    cy.wait(2000)
    cy.get('#swal2-html-container').contains('Tài khoản chưa được tạo hoặc chưa được kích hoạt.')
    cy.wait(2000)
  })

  it('Đúng tên đăng nhập nhưng sai mật khẩu', () => {
    cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
    cy.get('#email').type('chstag11111@getnada.com')
    cy.wait(2000)
    cy.get('#password').type('text_pass')
    cy.wait(2000)
    cy.get('#submit-btn').click()
    cy.wait(2000)
    cy.get('#swal2-html-container').contains('Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại')
    cy.wait(2000)
  })
})

describe('Verify Sign in successfuly', () => {
  
  beforeEach(()=>{
	  cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
  })
  
  it('Đăng nhập thành công với user Administrator', () => {
    cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
    cy.get('#email').type('admin_balan@getnada.com')
    cy.wait(2000)
    cy.get('#password').type('Ari123456#')
    cy.wait(2000)
    cy.get('#submit-btn').click()
    cy.wait(2000)
    cy.get('.text-lg').contains('Chào mừng bạn đã đến với BALANCE!')
    cy.wait(2000)
    cy.get('.t-10').click()
    cy.wait(2000)
    cy.get('.bg-teal-700').contains('Dashboard')
    cy.get('#menu-sidebar > :nth-child(4)').contains('Quản lý người dùng')
    cy.get('#menu-sidebar > :nth-child(6)').contains('Quản lý nhà cung cấp')
    cy.get('#menu-sidebar > :nth-child(7)').contains('Quản lý cửa hàng')
  })

  it('Đăng nhập thành công với user ĐẠI DIỆN CỬA HÀNG', () => {
    cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
    cy.get('#email').type('chstag11111@getnada.com')
    cy.wait(2000)
    cy.get('#password').type('Ari123456#')
    cy.wait(2000)
    cy.get('#submit-btn').click()
    cy.wait(2000)
    cy.get('.text-lg').contains('Chào mừng bạn đã đến với BALANCE!')
    cy.wait(2000)
    cy.get('.t-10').click()
    cy.wait(2000)
    cy.get('.bg-teal-700').contains('Dashboard')
    cy.get('#menu-sidebar > :nth-child(2)').contains('Đặt hàng')
    cy.get('#menu-sidebar > :nth-child(6)').contains('Quản lý người dùng')
    cy.get('#menu-sidebar > :nth-child(8)').contains('Quản lý NCC')
  })

  it('Đăng nhập thành công với user NCC', () => {
    cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
    cy.get('#email').type('nccstag11111@getnada.com')
    cy.wait(2000)
    cy.get('#password').type('Ari123456#')
    cy.wait(2000)
    cy.get('#submit-btn').click()
    cy.wait(2000)
    cy.get('.text-lg').contains('Chào mừng bạn đã đến với BALANCE!')
    cy.wait(2000)
    cy.get('.t-10').click()
    cy.wait(2000)
    cy.get('.bg-teal-700').contains('Dashboard')
    cy.get('#menu-sidebar > :nth-child(2)').contains('Quản lý đơn hàng')
    cy.get('#menu-sidebar > :nth-child(3)').contains('Quản lý trả hàng')
  })
})

describe('Verify navigate to Quên mật khẩu page', () => {
  
  beforeEach(()=>{
	  cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
  })
  
  it('Kiểm tra chức năng quên mật khẩu', () => {
    cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
    cy.get('#reset-pass-link').click()
    cy.wait(2000)
    cy.url().should('include',"/forgot-password")
    cy.get('.mb-8 > h5').contains('Vui lòng nhập e-mail của bạn. Mã xác minh OTP sẽ được gửi cho bạn')
    cy.wait(2000)
  })
})

describe('Verify displays the password', () => {
  beforeEach(()=>{
	  cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
  })
  
  it('Kiểm tra chức năng hiện mật khẩu', () => {
    cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
    cy.get('#email').type('text_user@gmail.com')
    cy.wait(2000)
    cy.get('#password').type('text_password').should('have.attr','type','password')
    cy.wait(2000)
    cy.get('.text-lg').click()
    cy.wait(2000)
    cy.get('#password').should('have.attr','type','text')
    cy.wait(2000)
  })
})

describe('Verify refresh page', () => {
  beforeEach(()=>{
	  cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
  })
  it('Reload page', () => {
    cy.visit('http://stag.balance.ari.com.vn/#/auth/login')
    cy.get('#email').type('text_user@gmail.com')
    cy.wait(2000)
    cy.get('#password').type('text_password')
    cy.wait(2000)
    cy.reload()
    cy.wait(2000)
    cy.get('#email').should("be.empty")
    cy.get('#password').should("be.empty")
  })
})