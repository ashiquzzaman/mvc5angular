using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AngujarCRUD.Startup))]
namespace AngujarCRUD
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
