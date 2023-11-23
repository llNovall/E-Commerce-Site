using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MongoDbAccess.Configs
{
    public class MongoConnectionSetting
    {
        public string? ConnectionString { get; set; }
        public string? DatabaseName { get; set; }
    }
}