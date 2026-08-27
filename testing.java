package firsttask;
import java.sql.Driver;
import java.time.Duration;
 
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.edge.*;
 
public class Openlms {
 
	public static void main(String[] args) throws Exception{
		WebDriver driver = new EdgeDriver();
		driver.get("https://hcltech-lms.career-shaper.com/");
 
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(50));
		driver.manage().window().maximize();
		driver.findElement(By.id("email")).click();
		driver.findElement(By.id("email")).clear();
		driver.findElement(By.id("email")).sendKeys("hcltb0833626");
 
		
		driver.findElement(By.id("password")).click();
		driver.findElement(By.id("password")).clear();
		driver.findElement(By.id("password")).sendKeys("Zxcvbnm,./@25");
		WebElement element = driver.findElement(By.className("checkmark"));
		if(!element.isSelected()) {
			element.click();
		}
		driver.findElement(By.id("login-button")).click();
		driver.findElement(By.id("go-home")).click();
		driver.findElement(By.linkText("TECHBEE_AMJ26_DB_ Automation_Testing_1")).click();
		driver.findElement(By.linkText("Automated Testing")).click();
 
 
		driver.findElement(By.className("instancename")).click();
 
 
	
 
		
	}
 
}
