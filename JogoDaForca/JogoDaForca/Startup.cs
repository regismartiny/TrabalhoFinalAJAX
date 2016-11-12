using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(JogoDaForca.Startup))]

namespace JogoDaForca
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}
