using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;

namespace JogoDaForca
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"));
            
            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/jquery.unobtrusive*",
                "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/handlebars").Include(
               "~/Scripts/handlebars.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
               /*"~/Scripts/app/marvelflix/herois.js",
               "~/Scripts/app/marvelflix/telaPrincipal.js",
               "~/Scripts/app/marvelflix/telaLogin.js",
               "~/Scripts/app/marvelflix/marvelflix.js",
               "~/Scripts/app/marvelflix/_start.js",*/
               "~/Scripts/app/timer.js",
               "~/Scripts/app/jogo.js",
               "~/Scripts/app/jogoDaForca.js",
               "~/Scripts/app/telaGameOver.js",
               "~/Scripts/app/telaJogo.js",
               "~/Scripts/app/telaLeaderBoard.js",
               "~/Scripts/app/telaInicial.js",
               "~/Scripts/app/telaLogin.js",
               "~/Scripts/app/_start.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                 "~/Content/bootstrap.css",
                 "~/Content/Site.css",
                 "~/Content/style.css",
                 "~/Content/styleLogin.css"));
        }
    }
}
