using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace WebAPI.Utils.Extensions
{
    public static class ModalStateDictionaryExtension
    {
        public static List<string> GetModalErrors(this ModelStateDictionary modalDict)
        {
            List<string> errors = modalDict.Values.SelectMany(c => c.Errors).Select(c => c.ErrorMessage).ToList();

            return errors;
        }
    }
}