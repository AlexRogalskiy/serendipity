package org.serendipity.webbff;

import lombok.extern.slf4j.Slf4j;
import org.serendipity.webbff.service.WebClientFilter;
import org.serendipity.webbff.utils.AuthConstants;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;

@Controller
@SpringBootApplication
@Slf4j
public class WebBffApplication implements ErrorController {

	private final Environment env;

	public WebBffApplication(Environment env) {
		this.env = env;
	}

	@Bean
	public WebClient getWebClient() {

		log.info("Web BFF Application -> getWebClient()");

		String baseUrl = env.getProperty("IDENTITY_SERVER_BASE_URL");

		if (baseUrl == null) {
			baseUrl = "http://serendipity-identity-server:10001";
		}

		log.info("baseUrl: {}", baseUrl);

		HttpClient httpClient = HttpClient.create().responseTimeout(Duration.ofMillis(AuthConstants.TIMEOUT));

		return WebClient.builder()
			.baseUrl(baseUrl)
			.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
			.filter(WebClientFilter.logRequest())
			.filter(WebClientFilter.logResponse())
			.clientConnector(new ReactorClientHttpConnector(httpClient))
			.build();
	}

	public static void main(String[] args) {

		log.info("Web BFF Application -> main()");

		SpringApplication.run(WebBffApplication.class, args);
	}

}

/*

	@RequestMapping("/error")
	@ResponseStatus(HttpStatus.OK)
	public String error() {

		// return "redirect:/index.html";
		return "redirect:/";

	}

*/
