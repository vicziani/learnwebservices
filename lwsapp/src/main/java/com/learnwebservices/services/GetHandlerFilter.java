package com.learnwebservices.services;

import org.springframework.stereotype.Component;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Component
public class GetHandlerFilter implements Filter {

    private static final List<String> urls = List.of("hello", "tempconverter");

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        var httpRequest = (HttpServletRequest) request;
        var httpResponse = (HttpServletResponse) response;
        if (serviceOnUrl(httpRequest) && methodIsGet(httpRequest) && notContainsWsdlParameter(httpRequest)) {
            httpResponse.setContentType("text/plain");
            httpResponse.setStatus(405);
            httpResponse.getWriter().write("Method Not Allowed, please use http POST method instead of GET");
        }
        else {
            chain.doFilter(request, response);
        }
    }

    private boolean methodIsGet(HttpServletRequest httpRequest) {
        return httpRequest.getMethod().equalsIgnoreCase("get");
    }

    private boolean serviceOnUrl(HttpServletRequest httpRequest) {
        String uri = httpRequest.getRequestURI();
        return urls.stream().map(s -> "/services/" + s).anyMatch(s -> s.equals(uri));
    }

    private boolean notContainsWsdlParameter(HttpServletRequest httpRequest) {
        return httpRequest.getQueryString() == null || !httpRequest.getQueryString().toLowerCase().contains("wsdl");
    }
}
