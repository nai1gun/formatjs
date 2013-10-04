## JavaScript String format method

####Examples:


    "Hello {0}!".format("World");

`"Hello World!"`
*********

    "Hop! Hey! {0}-{0}-{1}!".format("La", "Ley");
    
`"Hop! Hey! La-La-Ley!"`
*********

    "Foo {0}[{*}]".format(["Bar", "Baz"])

`"Foo BarBaz"`
*********

    "<ul>{0}[<li>{*}</li>]</ul>".format(["Foo", "Bar"])
`"<ul><li>Foo</li><li>Bar</li></ul>"`
*********

    "<ul>{0}[<li>{*}</li>](<li>delimiter<li>)</ul>".format(["Foo", "Bar", "Baz"])
`"<ul><li>Foo</li><li>delimiter<li><li>Bar</li><li>delimiter<li><li>Baz</li></ul>"`
*********

    "<ul>{0}[<li id='{id}'>{name}</li>](<li>delimiter<li>)</ul>".format([{id: 1, name: "Foo"}, {id: 2, name: "Bar"}])
`"<ul><li id='1'>Foo</li><li>delimiter<li><li id='2'>Bar</li></ul>"`
