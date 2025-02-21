public static class SessionHelper
{
    private static IHttpContextAccessor _httpContextAccessor;

    public static void Configure(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public static void SetSession(string key, string value)
    {
        _httpContextAccessor.HttpContext?.Session.SetString(key, value);
    }

    public static string GetSession(string key)
    {
        return _httpContextAccessor.HttpContext?.Session.GetString(key);
    }
}
