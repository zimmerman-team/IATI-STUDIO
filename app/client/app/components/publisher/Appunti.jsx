function postCKANStructure(name, owner_org, title){
  return (
    {
    "resources": [{"url": "https://www.iatistudio.com/file.xml"}],
    "name": "zimmzimm-2",
    "owner_org": "82d15531-5929-4724-adad-49d6854a0485",
    "title": "ZZtestAlessandro"
    }
)
}

let postCKAN = postCKANStructure(this.props.publisher.userId + "-3", "82d15531-5929-4724-adad-49d6854a0485", "ZZtestAlessandro")

// THIS PASS AS A POST
{
"resources": [{"url": "https://www.iatistudio.com/file.xml"}],
"name": "zimmzimm-5",
"owner_org": "82d15531-5929-4724-adad-49d6854a0485"
}


{ resources: [ { url: "https://www.iatistudio.com/files/zimmzimm-gggg.xml" } ],
  name: "zimmzimm-gggg",
  extras:
   [ { key: "activity_count", value: "0" },
     { key: "data_updated", value: "2016-09-28" },
     { key: "filetype", value: "activity" } ],
  title: "gggg",
  owner_org: "82d15531-5929-4724-adad-49d6854a0485" }
