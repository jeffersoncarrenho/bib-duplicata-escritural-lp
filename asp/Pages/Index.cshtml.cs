using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BibDuplicataEscrituralFinal.Pages
{
    public class IndexModel : PageModel
    {
        public IActionResult OnGet()
        {
            var userAgent = Request.Headers["User-Agent"].ToString();
            var isMobile = Regex.IsMatch(userAgent, "Mobi|Android|iPhone|iPad|iPod", RegexOptions.IgnoreCase);
            if (isMobile)
            {
                return RedirectToPage("/Completo");
            }
            return Page();
        }
    }
}
