describe("Controls", function() {
    var controls = require('../js/controls/controls');
    it("should create successfully", function() {
        console.log(controls);
        var c = new controls.Controls(true, true, true, true);
        expect(c.left).toBeTruthy(); 
        expect(c.right).toBeTruthy(); 
        expect(c.up).toBeTruthy(); 
        expect(c.down).toBeTruthy(); 
        expect(c.horizontal).toBeTruthy(); 
        expect(c.vertical).toBeTruthy(); 
        expect(c.any).toBeTruthy(); 
    });
    
    it("should know horizontal and any with left only", function() {
        var c = new controls.Controls(true, false, false, false);
        expect(c.left).toBeTruthy(); 
        expect(c.right).toBeFalsy(); 
        expect(c.up).toBeFalsy(); 
        expect(c.down).toBeFalsy(); 
        expect(c.horizontal).toBeTruthy(); 
        expect(c.vertical).toBeFalsy(); 
        expect(c.any).toBeTruthy(); 
    });
    
    it("should know horizontal and any with right only", function() {
        var c = new controls.Controls(false, true, false, false);
        expect(c.left).toBeFalsy(); 
        expect(c.right).toBeTruthy(); 
        expect(c.up).toBeFalsy(); 
        expect(c.down).toBeFalsy(); 
        expect(c.horizontal).toBeTruthy(); 
        expect(c.vertical).toBeFalsy(); 
        expect(c.any).toBeTruthy(); 
    });
    
    it("should know vertical and any with up only", function() {
        var c = new controls.Controls(false, false, true, false);
        expect(c.left).toBeFalsy(); 
        expect(c.right).toBeFalsy(); 
        expect(c.up).toBeTruthy(); 
        expect(c.down).toBeFalsy(); 
        expect(c.horizontal).toBeFalsy(); 
        expect(c.vertical).toBeTruthy(); 
        expect(c.any).toBeTruthy(); 
    });
    
    it("should know vertical and any with down only", function() {
        var c = new controls.Controls(false, false, false, true);
        expect(c.left).toBeFalsy(); 
        expect(c.right).toBeFalsy(); 
        expect(c.up).toBeFalsy(); 
        expect(c.down).toBeTruthy(); 
        expect(c.horizontal).toBeFalsy(); 
        expect(c.vertical).toBeTruthy(); 
        expect(c.any).toBeTruthy(); 
    });
    
    it("should know both vertical and horizontal can be true", function() {
        var c = new controls.Controls(true, false, false, true);
        expect(c.left).toBeTruthy(); 
        expect(c.right).toBeFalsy(); 
        expect(c.up).toBeFalsy(); 
        expect(c.down).toBeTruthy(); 
        expect(c.horizontal).toBeTruthy(); 
        expect(c.vertical).toBeTruthy(); 
        expect(c.any).toBeTruthy(); 
    });
    
    it("should know none are true", function() {
        var c = new controls.Controls(false, false, false, false);
        expect(c.left).toBeFalsy(); 
        expect(c.right).toBeFalsy(); 
        expect(c.up).toBeFalsy(); 
        expect(c.down).toBeFalsy(); 
        expect(c.horizontal).toBeFalsy(); 
        expect(c.vertical).toBeFalsy(); 
        expect(c.any).toBeFalsy(); 
    });
});

//Simple example
// describe("Converter", function() {
//     var timeConverter = require('../lib/converter');
// 	it("should work", function() {
// 		var converter = new timeConverter.TimeConverter();
// 		converter.logMoment();
//      expect('blah').toEqual('blah');
// 	});
// });