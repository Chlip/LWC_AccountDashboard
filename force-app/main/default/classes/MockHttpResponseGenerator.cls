@isTest
public class MockHttpResponseGenerator implements HttpCalloutMock {

    private String response;
    private Integer statusCode;

    // Constructor to initialize the response and status code
    public MockHttpResponseGenerator(String response, Integer statusCode) {
        this.response = response;
        this.statusCode = statusCode;
    }

    // Method that generates the mock HTTP response
    public HttpResponse respond(HttpRequest request) {
        HttpResponse res = new HttpResponse();
        res.setBody(response);
        res.setStatusCode(statusCode);
        return res;
    }
}
