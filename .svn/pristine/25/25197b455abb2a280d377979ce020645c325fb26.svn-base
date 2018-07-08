package ddd.simple.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;

public class HttpClient {
	// 发送一个GET请求
	public static String getMethod(String parth){
		String result = "";
        BufferedReader in = null;
        try {
            String urlNameString = parth;
            URL realUrl = new URL(urlNameString);
            // 打开和URL之间的连接
            URLConnection connection = realUrl.openConnection();
            // 设置通用的请求属性
            connection.setRequestProperty("accept", "*/*");
            connection.setRequestProperty("connection", "Keep-Alive");
            connection.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // 建立实际的连接
            connection.connect();
            // 获取所有响应头字段
            Map<String, List<String>> map = connection.getHeaderFields();
            // 遍历所有的响应头字段
            for (String key : map.keySet()) {
                System.out.println(key + "--->" + map.get(key));
            }
            // 定义 BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(
                    connection.getInputStream(),"UTF-8"));
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
            System.out.println("发送GET请求出现异常！" + e);
            e.printStackTrace();
        }
        // 使用finally块来关闭输入流
        finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return result;
	}
	public static String get(String path) throws Exception {
		HttpURLConnection httpConn = null;
		BufferedReader in = null;
		try {
			URL url = new URL(path);
			httpConn = (HttpURLConnection) url.openConnection();
			httpConn.setRequestMethod("GET");
			// 读取响应
			if (httpConn.getResponseCode() == HttpURLConnection.HTTP_OK) {
				StringBuffer content = new StringBuffer();
				String tempStr = "";
				in = new BufferedReader(new InputStreamReader(
						httpConn.getInputStream(),"UTF-8"));
				while ((tempStr = in.readLine()) != null) {
					content.append(tempStr);
				}
				return content.toString();
			} else {
				throw new Exception("请求出现了问题!");
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			in.close();
			httpConn.disconnect();
		}
		return null;
	}

	// 发送一个GET请求,参数形式key1=value1&key2=value2...
	public static String post(String path, String params) throws Exception {
		HttpURLConnection httpConn = null;
		BufferedReader in = null;
		PrintWriter out = null;
		try {
			URL url = new URL(path);
			httpConn = (HttpURLConnection) url.openConnection();
			httpConn.setRequestMethod("POST");
			httpConn.setDoInput(true);
			httpConn.setDoOutput(true);

			// 发送post请求参数
			out = new PrintWriter(httpConn.getOutputStream());
			out.println(params);
			out.flush();

			// 读取响应
			if (httpConn.getResponseCode() == HttpURLConnection.HTTP_OK) {
				StringBuffer content = new StringBuffer();
				String tempStr = "";
				in = new BufferedReader(new InputStreamReader(
						httpConn.getInputStream(),"UTF-8"));
				while ((tempStr = in.readLine()) != null) {
					content.append(tempStr);
				}
				return content.toString();
			} else {
				throw new Exception("请求出现了问题!");
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			in.close();
			out.close();
			httpConn.disconnect();
		}
		return null;
	}

	public static void main(String[] args) throws Exception {
	//	String resMessage = HttpClient.post("http://localhost:3000/hello",
		//		"hello=hello post");
		 
	}

}
