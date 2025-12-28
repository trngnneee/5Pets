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

WebUI.click(findTestObject('Object Repository/Place Order_Obj/Page_5Pets/a_Ch Pug Mt X'))

WebUI.click(findTestObject('Object Repository/Place Order_Obj/Page_5Pets/button_Thm vo gi hng'))

WebUI.click(findTestObject('Object Repository/Place Order_Obj/Page_5Pets/button_Xc nhn'))

WebUI.click(findTestObject('Object Repository/Place Order_Obj/Page_5Pets/button_Admin Dashboard_inline-flex items-ce_6a32ae'))

WebUI.setText(findTestObject('Object Repository/Place Order_Obj/Page_5Pets/input_H v tn_fullname'), 'giaBao')

WebUI.setText(findTestObject('Object Repository/Place Order_Obj/Page_5Pets/input_S in thoi_phone'), '0358941739')

WebUI.setText(findTestObject('Object Repository/Place Order_Obj/Page_5Pets/input_a ch_address'), '102A Le Loi My Tho Dong Thap')

WebUI.setText(findTestObject('Object Repository/Place Order_Obj/Page_5Pets/input_Email_email'), 'giabaozk2005@gmail.com')

WebUI.click(findTestObject('Object Repository/Place Order_Obj/Page_5Pets/input_a ch_address'))

WebUI.click(findTestObject('Object Repository/Place Order_Obj/Page_5Pets/button_(Thanh ton qua v in t Zalopay)_peer _f585b2'))

WebUI.click(findTestObject('Object Repository/Place Order_Obj/Page_5Pets/button_t hng'))

WebUI.verifyElementText(findTestObject('Object Repository/Place Order_Obj/Page_5Pets/div_t hng thnh cng'), 'Đặt hàng thành công!')

