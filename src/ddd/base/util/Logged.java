package ddd.base.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author qiaowei.wu
 * @version 1.0    2016/5/12 14:55
 */
public class Logged {
    public static Logger logConsole = LoggerFactory.getLogger("stdout");

    public static Logger logFile = LoggerFactory.getLogger("logfile");

    public static Logger logSession = LoggerFactory.getLogger("sessionLog");

    public static Logger logDebug = LoggerFactory.getLogger("debugLog");

    public static Logger logError = LoggerFactory.getLogger("errorLog");


    public static void logConsole(String logStr){
        if (logConsole.isInfoEnabled()){
            logConsole.info(logStr);
        }
    }

    public static void logDebug(String logStr){
        if (logDebug.isInfoEnabled()){
            logDebug.info(logStr);
        }
    }
    public static void logFile(String logStr){
        if (logFile.isInfoEnabled()){
            logFile.info(logStr);
        }
    }

    public static void logSession(String logTitle,Object entity,String... logStr){
        if (logSession.isInfoEnabled()){
            StringBuilder sb = new StringBuilder();
            if (logStr != null && logStr.length != 0) {
                for (String str : logStr){
                    sb.append(" ### ").append(str);
                }
            }
            logSession.info(logTitle+" ### "+JSONUtil.entityToJSON(entity,false).getJson() + sb.toString());
        }
    }
    public static void logSession(String logTitle,String... logStr){
        if (logSession.isInfoEnabled()){
            StringBuilder sb = new StringBuilder();
            if (logStr != null && logStr.length != 0) {
                for (String str : logStr){
                    sb.append(" ### ").append(str);
                }
            }
            logSession.info(logTitle+" ### "+sb.toString());
        }
    }

    public static void logError(String logStr){
        logError.error(logStr);
    }
    public static void logError(String logStr, Throwable throwable){
        logError.error(logStr, throwable);
    }
}
