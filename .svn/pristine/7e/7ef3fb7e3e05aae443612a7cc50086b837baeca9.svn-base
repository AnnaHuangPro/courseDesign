package ddd.simple.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.stereotype.Service;

@Service
public class CommonTools{
	public boolean checkEmail(String email) {
		boolean flag = false;
		try {
			String check = "^([a-z0-9A-Z]+[-|_|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
			Pattern regex = Pattern.compile(check);
			Matcher matcher = regex.matcher(email);
			flag = matcher.matches();
		} catch (Exception e) {
			flag = false;
		}
		return flag;
	}

	public boolean isCard(String cardNo)
	{
		boolean flag = false;
		try {
			Pattern idNumPattern = Pattern.compile("([0-9a-zA-Z]{14})|([0-9a-zA-Z]{17})|([0-9a-zA-Z]{13})");  
	        Matcher idNumMatcher = idNumPattern.matcher(cardNo);
			flag = idNumMatcher.matches();
		}catch (Exception e) {
			flag = false;
		}
		return flag;
	}
}
