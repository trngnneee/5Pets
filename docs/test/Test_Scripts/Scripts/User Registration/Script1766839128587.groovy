import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testng.keyword.TestNGBuiltinKeywords as TestNGKW
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

WebUI.openBrowser('')

WebUI.navigateToUrl('http://localhost:3000/')

WebUI.click(findTestObject('Object Repository/Register_Obj/Page_5Pets/button_Admin Dashboard'))

WebUI.click(findTestObject('Object Repository/Register_Obj/Page_5Pets/a_ng k'))

WebUI.setText(findTestObject('Object Repository/Register_Obj/Page_5Pets/input_H tn_fullname'), 'Nguyễn Thanh Gia Bảo')

WebUI.setText(findTestObject('Object Repository/Register_Obj/Page_5Pets/input_Email_email'), 'giabao.150905@gmail.com')

WebUI.setEncryptedText(findTestObject('Object Repository/Register_Obj/Page_5Pets/input_Mt khu_password'), 'lcaTKsNvHeiooKR7cDBJFw==')

WebUI.click(findTestObject('Object Repository/Register_Obj/Page_5Pets/div_ng  vi chnh sch iu khon'))

WebUI.click(findTestObject('Object Repository/Register_Obj/Page_5Pets/button_ng k'))

WebUI.verifyElementText(findTestObject('Object Repository/Register_Obj/Page_5Pets/div_ng k thnh cng'), 'Đăng ký thành công!')

WebUI.closeBrowser()